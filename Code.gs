const BALEPORT = Object.freeze({
  APP_NAME: 'Baleport',
  TOKEN_PROPERTY: 'MAPBOX_PUBLIC_TOKEN'
});

function doGet(e) {
  const template = HtmlService.createTemplateFromFile('Index');
  const props = PropertiesService.getScriptProperties();
  template.mapboxToken = props.getProperty(BALEPORT.TOKEN_PROPERTY) || '';
  template.sharedRoute = (e && e.parameter && e.parameter.r) ? String(e.parameter.r) : '';
  template.appUrl = ScriptApp.getService().getUrl() || '';

  return template.evaluate()
    .setTitle('Baleport · Freight Route Estimator')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, viewport-fit=cover')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Sends the currently selected route as a polished HTML email.
 * The client sends only the route summary needed for sharing.
 */
function shareRouteByEmail(payload) {
  if (!payload || !payload.to || !payload.route) {
    throw new Error('Recipient and route data are required.');
  }

  const to = String(payload.to).trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    throw new Error('Enter a valid recipient email address.');
  }

  const route = payload.route;
  const routeName = escapeHtml_(route.name || 'Freight route');
  const quote = Number(route.quote || 0);
  const distance = Number(route.distanceMiles || 0);
  const duration = String(route.durationText || '—');
  const note = escapeHtml_(payload.note || '');
  const stops = Array.isArray(route.stops) ? route.stops : [];
  const warnings = Array.isArray(route.warnings) ? route.warnings : [];

  const appUrl = ScriptApp.getService().getUrl() || '';
  const shareUrl = payload.shareToken && appUrl
    ? appUrl + '?r=' + encodeURIComponent(String(payload.shareToken))
    : appUrl;

  const stopRows = stops.map(function(stop, index) {
    const label = index === 0 ? 'Pickup' : (index === stops.length - 1 ? 'Drop-off' : 'Stop ' + index);
    return '<tr>' +
      '<td style="padding:10px 0;color:#6b7280;font-size:12px;vertical-align:top;width:90px">' + label + '</td>' +
      '<td style="padding:10px 0;color:#111827;font-size:14px;border-bottom:1px solid #eceff3">' + escapeHtml_(stop.address || '—') + '</td>' +
    '</tr>';
  }).join('');

  const warningHtml = warnings.length
    ? '<div style="margin-top:18px;padding:14px 16px;border:1px solid #f2c94c;background:#fffaf0;border-radius:10px">' +
        '<div style="font-weight:700;color:#7a5710;margin-bottom:6px">Route alerts</div>' +
        warnings.map(function(w) { return '<div style="font-size:13px;color:#7a5710;margin:4px 0">• ' + escapeHtml_(w) + '</div>'; }).join('') +
      '</div>'
    : '';

  const noteHtml = note
    ? '<div style="margin-top:18px;padding:14px 16px;background:#f6f7f9;border-radius:10px"><div style="font-size:12px;color:#6b7280;margin-bottom:5px">Note</div><div style="font-size:14px;color:#111827;line-height:1.55">' + note + '</div></div>'
    : '';

  const htmlBody = '<div style="background:#f3f4f6;padding:28px;font-family:Arial,Helvetica,sans-serif">' +
    '<div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden">' +
      '<div style="padding:22px 24px;border-bottom:1px solid #e5e7eb;display:flex;align-items:center;justify-content:space-between">' +
        '<div><div style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#6b7280">Baleport</div><div style="font-size:22px;font-weight:800;color:#111827;margin-top:4px">' + routeName + '</div></div>' +
      '</div>' +
      '<div style="padding:24px">' +
        '<div style="display:table;width:100%;border-collapse:separate;border-spacing:8px 0;margin:0 -8px 20px">' +
          metricCell_('Estimate', '$' + quote.toFixed(2)) +
          metricCell_('Distance', distance.toFixed(1) + ' mi') +
          metricCell_('Drive time', duration) +
        '</div>' +
        '<table style="width:100%;border-collapse:collapse">' + stopRows + '</table>' +
        warningHtml + noteHtml +
        (shareUrl ? '<div style="margin-top:22px"><a href="' + escapeHtml_(shareUrl) + '" style="display:inline-block;background:#111827;color:#ffffff;text-decoration:none;padding:12px 18px;border-radius:9px;font-size:14px;font-weight:700">Open route in Baleport</a></div>' : '') +
        '<div style="margin-top:22px;color:#9ca3af;font-size:11px;line-height:1.5">Estimate only. Verify vehicle, road, clearance, weight, insurance, permitting, and carrier requirements before dispatch.</div>' +
      '</div>' +
    '</div>' +
  '</div>';

  MailApp.sendEmail({
    to: to,
    subject: 'Baleport route · ' + (route.name || 'Freight estimate'),
    body: buildPlainTextShare_(route, payload.note || '', shareUrl),
    htmlBody: htmlBody,
    name: 'Baleport'
  });

  return { ok: true, remainingQuota: MailApp.getRemainingDailyQuota() };
}

function metricCell_(label, value) {
  return '<div style="display:table-cell;width:33.33%;padding:14px;background:#f8fafc;border:1px solid #eef0f3;border-radius:10px">' +
    '<div style="font-size:11px;color:#6b7280;margin-bottom:5px">' + escapeHtml_(label) + '</div>' +
    '<div style="font-size:18px;font-weight:800;color:#111827">' + escapeHtml_(value) + '</div>' +
  '</div>';
}

function buildPlainTextShare_(route, note, shareUrl) {
  const lines = [
    'Baleport · ' + (route.name || 'Freight route'),
    '',
    'Estimate: $' + Number(route.quote || 0).toFixed(2),
    'Distance: ' + Number(route.distanceMiles || 0).toFixed(1) + ' mi',
    'Drive time: ' + (route.durationText || '—'),
    ''
  ];
  (route.stops || []).forEach(function(stop, i) {
    lines.push((i === 0 ? 'Pickup' : (i === route.stops.length - 1 ? 'Drop-off' : 'Stop ' + i)) + ': ' + (stop.address || '—'));
  });
  if (route.warnings && route.warnings.length) {
    lines.push('', 'Route alerts:');
    route.warnings.forEach(function(w) { lines.push('- ' + w); });
  }
  if (note) lines.push('', 'Note:', note);
  if (shareUrl) lines.push('', 'Open route: ' + shareUrl);
  lines.push('', 'Estimate only. Verify all operating and road restrictions before dispatch.');
  return lines.join('\n');
}

function escapeHtml_(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
