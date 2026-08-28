# Baleport

**Professional non-CDL freight route planning, estimating, and dispatch preparation.**

Baleport is a lightweight freight and shipping web application built for owner-operators, local carriers, courier teams, dispatchers, and small logistics businesses.

It combines Mapbox-powered routing with configurable freight estimating, vehicle and roadway constraints, multi-stop route planning, editable turn-by-turn directions, and dispatch-ready export/share tools in one focused workspace.

> **Smarter routes. Faster quotes. Cleaner dispatch.**

---

## Overview

Many small freight operators still build quotes and dispatch plans using a combination of:

- Consumer map applications
- Mileage calculators
- Spreadsheets
- Notes
- Text messages
- Email
- Manual driver instructions

Baleport brings those tasks together.

A user can:

1. Enter a pickup and destination.
2. Add intermediate delivery stops.
3. Configure the vehicle and shipment.
4. Apply routing preferences and supported vehicle constraints.
5. Calculate the route.
6. Compare alternative route scenarios.
7. Generate a freight estimate.
8. Review route alerts.
9. Review and edit turn-by-turn directions.
10. Export, print, copy, or email the resulting route sheet.

Baleport is intentionally narrower than an enterprise Transportation Management System.

It focuses on the planning, estimating, and dispatch workflow that matters most to small non-CDL freight operations.

---

## Key Features

### Mapbox-Powered Routing

Baleport uses Mapbox services for mapping, geocoding, route calculation, and supported route optimization.

Capabilities include:

- Address and place search
- Pickup and destination routing
- Intermediate stops
- Multi-stop routes
- Route visualization
- Distance calculation
- Estimated drive time
- Traffic-aware routing where supported
- Alternative route comparison
- Stop-order optimization
- Turn-by-turn maneuver instructions
- Route notifications and alerts
- Vehicle-related routing constraints supported by Mapbox

### Multiple Route Scenarios

Baleport supports multiple route tabs so operators can compare different delivery plans without rebuilding the trip from scratch.

Example comparisons include:

- Toll route vs. non-toll route
- Interstate vs. local-road preference
- Different stop sequences
- Different vehicle profiles
- Standard vs. rush delivery
- Different pricing assumptions
- Different pickup or destination options

Each route scenario can maintain its own stops, route calculation, vehicle and shipment settings, routing filters, estimate, route alerts, and turn-by-turn directions.

### Multi-Stop Route Planning

Users can create routes containing pickup, one or more intermediate stops, and a final destination.

Baleport can also use Mapbox optimization functionality to improve the order of intermediate stops where supported. The first pickup and final destination can remain fixed while intermediate stops are reordered.

Optimization is intended to improve routing efficiency but does not account for every operational factor, including appointment windows, loading time, customer priority, driver breaks, facility hours, site accessibility, and real-world temporary restrictions.

---

## Vehicle Profiles

Baleport supports configurable vehicle profiles for common non-CDL freight equipment.

Example planning presets may include:

- Cargo van
- High-roof cargo van
- Sprinter-style van
- 12-foot box truck
- 16-foot box truck
- Custom vehicle

Vehicle information may include:

- Vehicle height
- Vehicle width
- Vehicle length
- Curb weight
- Payload capacity

All vehicle presets should be treated as editable planning examples. Operators remain responsible for entering and verifying the specifications of the actual vehicle being used.

---

## Vehicle Constraint Routing

Where supported by Mapbox routing data, Baleport can apply vehicle constraints to route calculations.

Supported planning parameters may include:

- Maximum vehicle height
- Maximum vehicle width
- Maximum total vehicle weight

These inputs can help the routing engine avoid certain restricted roads when compatible restriction data is available.

### Important

Vehicle-routing constraints are planning aids. They do not guarantee that every bridge, tunnel, road, private entrance, loading facility, railroad crossing, utility line, tree canopy, or temporary restriction is represented in routing data.

Drivers must follow posted signage and actual roadway conditions.

---

## Vehicle Length

Vehicle length can be stored and displayed as a planning value.

If the configured routing provider does not support vehicle-length routing restrictions, Baleport treats length as advisory rather than claiming the route has been validated for that dimension.

---

## Payload Capacity

Baleport can compare shipment weight against the configured vehicle payload assumption.

The interface can alert the operator when the entered load exceeds the configured payload value.

Payload warnings are planning guardrails only. They do not replace manufacturer ratings, GVWR verification, GAWR verification, certified scale weights, cargo securement requirements, or applicable transportation law.

---

## Advanced Route Settings

Baleport provides configurable route preferences.

Depending on provider support, users can request routes that:

- Avoid toll roads
- Avoid motorways or interstates
- Avoid ferries
- Avoid unpaved roads
- Avoid tunnels
- Avoid state-border crossings
- Avoid country-border crossings
- Use a preferred destination approach
- Request alternative routes
- Use traffic-aware routing

Routing exclusions are generally best-effort.

If an exclusion cannot be satisfied, the routing service may return route notifications that Baleport can surface to the user.

---

## Route Alerts

Baleport can display operational alerts derived from:

- Mapbox routing notifications
- Route restriction violations
- Height constraints
- Width constraints
- Weight constraints
- Toll restrictions
- Motorway exclusions
- Tunnel restrictions
- Unpaved-road restrictions
- Payload capacity checks
- Vehicle-length advisory information

Alerts are intended to prompt additional review before dispatch. They do not certify that a route is legally or physically accessible.

---

## Freight Estimator

Baleport includes a configurable freight pricing engine.

Operators can define their own pricing assumptions instead of relying on a fixed market rate.

Supported pricing inputs can include:

- Base charge
- Per-mile rate
- Drive-time rate
- Additional-stop fee
- Fuel adjustment
- Minimum charge
- Rush markup
- Heavy-load surcharge

### Example Estimate Structure

```text
Base charge
+
Mileage charge
+
Drive-time charge
+
Additional stop charges
+
Applicable surcharges
+
Fuel adjustment
+
Rush markup
=
Calculated subtotal

Then:

Apply minimum charge if required
```

The exact deployed calculation logic is the source of truth.

### Base Charge

The base charge provides a minimum starting amount for each job. It may help account for vehicle mobilization, dispatch overhead, administrative work, initial loading coordination, and basic operating cost.

### Per-Mile Pricing

Baleport converts the calculated route distance into a mileage-based charge using the operator's configured rate.

Example:

```text
64.3 miles × $2.10/mile
```

Baleport does not prescribe a universal freight rate.

### Drive-Time Pricing

Operators may include an hourly or time-based operating charge.

Estimated drive time comes from the routing service. Actual trip duration can differ due to traffic, weather, loading, unloading, driver breaks, construction, customer delays, and route changes.

### Additional Stops

Intermediate delivery stops can trigger configurable stop fees. This helps account for operational overhead not represented by mileage alone.

### Fuel Adjustment

Baleport can apply a configurable fuel adjustment.

Unless a live fuel-price service is integrated, this should be understood as an operator-controlled pricing assumption rather than a live fuel index.

### Rush Pricing

Rush or priority loads can use an additional configurable markup for same-day service, priority dispatch, tight pickup windows, or accelerated delivery.

### Minimum Charge

A configurable minimum charge prevents very short deliveries from producing estimates below the operator's desired minimum job price.

---

## Turn-by-Turn Directions

Baleport can request turn-by-turn route steps from Mapbox.

Directions are grouped by route leg.

For example:

```text
Leg 1
Pickup → Stop 1

Leg 2
Stop 1 → Destination
```

Each maneuver can include:

- Driving instruction
- Road or street name
- Distance
- Estimated duration
- Maneuver location

---

## Editable Driver Instructions

Generated directions can be edited inside Baleport.

This allows dispatchers to add practical operational context such as:

- Gate instructions
- Dock entrance information
- Receiving instructions
- Customer check-in requirements
- Site access notes
- Internal dispatch directions

Example:

```text
Original:
Turn right onto Industrial Drive.

Edited:
Turn right onto Industrial Drive and use the second gate marked Receiving.
```

### Important

Editing the instruction text does **not** modify the mapped route.

If the actual route must change, the user should modify the route stops or routing settings and calculate the route again.

Edited directions can be identified separately from the original routing instructions, and users can reset an edited instruction back to its original generated value.

---

## Route Sheet

Baleport can convert the calculated route into a practical dispatch sheet.

A route sheet may include:

- Route name
- Pickup
- Intermediate stops
- Destination
- Vehicle details
- Shipment information
- Route distance
- Estimated drive time
- Freight estimate
- Route alerts
- Dispatch notes
- Turn-by-turn directions
- Manually edited direction text

---

## Export & Sharing

Baleport supports several output formats depending on the deployed version.

### TXT

Useful for notes, driver instructions, messaging, internal documentation, and simple archival records.

### CSV

Useful for spreadsheet workflows, route-step data, operational records, and further reporting.

### Print / PDF

Baleport provides print-friendly route output. The browser print dialog can also be used to save a route sheet as PDF.

### Copy Summary

Baleport can generate a concise route summary for SMS, notes, Slack, messaging applications, CRM notes, and customer communications.

### Email Sharing

Baleport uses Google Apps Script server-side functionality for email sharing.

A shared email can contain:

- Route name
- Pickup
- Intermediate stops
- Destination
- Distance
- Drive time
- Estimate
- Route alerts
- Dispatch notes
- Turn-by-turn instructions

Users may be able to choose whether the full directions are included.

Email sending is subject to Google Apps Script MailApp quotas and deployment permissions.

---

## Technology Stack

### Frontend

- HTML5
- CSS
- Vanilla JavaScript
- Mapbox GL JS

### Backend

- Google Apps Script
- HTML Service
- Apps Script server functions
- MailApp

### Mapping

- Mapbox GL JS
- Mapbox Geocoding
- Mapbox Directions API
- Mapbox Optimization API where applicable

---

## Application Architecture

```text
User Browser
│
├── Baleport HTML / CSS / JavaScript
│
├── Mapbox GL JS
├── Mapbox Geocoding
├── Mapbox Directions
└── Mapbox Optimization
│
▼
Google Apps Script Web App
│
├── Runtime configuration
├── Email sharing
├── Deployment
└── Server-side functions
```

When Baleport is embedded into a website:

```text
Baleport Website / Google Sites
        │
        ▼
Apps Script Web App
        │
        ├── Baleport UI
        ├── Mapbox
        └── Apps Script server functions
```

---

## Google Sites Embedding

Baleport can be embedded into a Google Sites website after deployment.

The preferred architecture is to embed the deployed Apps Script web-app URL rather than paste the application source directly into Google Sites.

```html
<iframe
  src="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
  title="Baleport Freight Route Estimator"
  style="width:100%;height:100vh;min-height:820px;border:0;display:block;"
  loading="eager"
  referrerpolicy="strict-origin-when-cross-origin">
</iframe>
```

Replace `YOUR_DEPLOYMENT_ID` with the actual Apps Script deployment ID.

A Google Sites Full Page Embed can also use the deployed `/exec` URL directly.

---

## Repository Structure

A typical Baleport Apps Script repository includes:

```text
Baleport/
│
├── Code.gs
├── Index.html
├── appsscript.json
├── README.md
└── README_SETUP.txt
```

Depending on the version, the project may later be separated into additional frontend partials such as `Styles.html` and `App.html`.

The current implementation favors a simple, maintainable frontend suitable for direct editing.

---

## Configuration

Baleport users should never be asked to provide developer API credentials.

Application integrations are configured by the administrator or deployer.

### Required Script Properties

#### `MAPBOX_ACCESS_TOKEN`

Baleport uses `MAPBOX_ACCESS_TOKEN` as the canonical Apps Script Script Property for the Mapbox browser token.

Use a Mapbox public access token intended for client-side browser usage.

Where supported, restrict the token to the appropriate deployment URLs and minimum required permissions.

---

## Adding the Mapbox Token

In Google Apps Script:

1. Open the Baleport Apps Script project.
2. Select **Project Settings**.
3. Scroll to **Script Properties**.
4. Click **Add script property**.
5. Add `MAPBOX_ACCESS_TOKEN`.
6. Enter the approved Mapbox public browser token as the value.
7. Save the property.
8. Deploy or redeploy the web app.

The user-facing Baleport application should never display a Mapbox token field.

---

## Runtime Configuration

Frontend-safe configuration should be explicitly allowlisted.

```javascript
function getPublicRuntimeConfig() {
  const props = PropertiesService.getScriptProperties();

  return {
    mapboxAccessToken:
      props.getProperty('MAPBOX_ACCESS_TOKEN') || ''
  };
}
```

Do not return all Script Properties to the browser.

Avoid:

```javascript
PropertiesService
  .getScriptProperties()
  .getProperties();
```

because future server-side secrets could accidentally be exposed.

---

## Missing Configuration

If Mapbox has not been configured, Baleport should show a normal application error state such as:

```text
Map service unavailable

This Baleport deployment has not been fully configured by the site administrator.
```

Do not ask the end user to paste a Mapbox token.

---

## Secrets and API Security

Private API credentials must remain server-side.

Never place private credentials inside:

- `Index.html`
- Client-side JavaScript
- Browser storage
- URLs
- Route share links
- TXT exports
- CSV exports
- PDF output
- Emails
- Project files

If a future integration requires a private API key, proxy that request through Apps Script.

```text
Browser
   ↓
google.script.run
   ↓
Apps Script server function
   ↓
Script Properties
   ↓
External API
```

---

## Session-First Privacy

Baleport follows the RanchAssist session-first product model.

The application should not require:

- User accounts
- Sign-in
- A permanent project database

Active-session resilience can use `sessionStorage` to recover current work after accidental refreshes during the active browser session.

Do not treat `sessionStorage` as permanent project storage.

Long-term browser persistence using `localStorage` should not be used as the primary project-saving model.

---

## Project Save / Resume

For a stateful production version of Baleport, the preferred long-term project persistence model is the RanchAssist `.ra` project file.

A Baleport project file can preserve:

- Routes
- Stops
- Vehicle profile
- Shipment information
- Pricing assumptions
- Routing settings
- Turn-by-turn edits
- Route notes
- Estimate configuration
- Map camera
- Project metadata

The `.ra` file is user-controlled and local. Baleport does not need to permanently store the project on its own server.

Recommended project actions:

```text
Open Project
Save Project
Duplicate Project
Clear Session
```

---

## Baleport `.ra` Project State

A Baleport project-state contract may include:

```text
routes
stops
vehicle
shipment
pricing
routeSettings
routeAlternatives
directionEdits
notes
mapCamera
preferences
```

Project metadata should include:

```text
Project UUID
Project name
Tool ID
Tool version
.ra format version
Created timestamp
Updated timestamp
```

API credentials must never be stored inside a `.ra` file.

---

## Deploying Baleport

### 1. Create an Apps Script Project

Create a standalone Google Apps Script project.

### 2. Add the Project Files

Add:

```text
Code.gs
Index.html
appsscript.json
```

Copy the corresponding Baleport source into each file.

### 3. Configure Script Properties

Add `MAPBOX_ACCESS_TOKEN` under **Project Settings → Script Properties**.

### 4. Configure the Manifest

Baleport email sharing may require the Apps Script send-mail OAuth scope.

```json
{
  "timeZone": "America/Chicago",
  "dependencies": {},
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8",
  "oauthScopes": [
    "https://www.googleapis.com/auth/script.send_mail"
  ]
}
```

Adjust configuration as required by the current repository version.

### 5. Deploy the Web App

In Apps Script:

```text
Deploy
→ New deployment
→ Web app
```

Configure deployment access according to how Baleport will be distributed and authorize any required permissions.

### 6. Copy the Deployment URL

The deployed application URL will resemble:

```text
https://script.google.com/macros/s/DEPLOYMENT_ID/exec
```

Use this URL to launch Baleport directly, embed Baleport into Google Sites, or link to Baleport from a marketing website.

---

## Updating the Deployment

After changing source code:

1. Save the project.
2. Open **Deploy → Manage deployments**.
3. Edit the existing web-app deployment.
4. Select **New version**.
5. Deploy.

If the website or iframe continues to display old UI after code changes, confirm that the latest Apps Script deployment version is active.

---

## Responsive Design

Baleport is designed to work across desktop, tablet, and mobile.

Desktop prioritizes:

- Large map area
- Route configuration
- Route comparison
- Estimate visibility

Mobile prioritizes:

- Large touch targets
- Stacked configuration
- Readable route output
- Accessible route actions
- Compact directions
- Practical field use

---

## Visual Design

Baleport follows the RanchAssist interface direction:

**Modern field operations software × precision instrumentation × clean editorial design.**

The visual system emphasizes:

- Warm off-white canvas
- White surfaces
- Near-black typography
- Thin neutral borders
- Restrained functional green
- Compact radii
- Minimal shadows
- Strong alignment
- Data-first hierarchy
- Functional diagrams and map visuals

The interface intentionally avoids western clichés, rustic textures, decorative cowboy imagery, heavy gradients, oversized rounded SaaS cards, excessive color, and decorative farm illustrations.

---

## Accessibility

Baleport should maintain:

- Semantic HTML
- Real form labels
- Keyboard-operable controls
- Visible focus states
- WCAG AA contrast
- Mobile-friendly touch targets
- Plain-language validation
- Status communicated with text in addition to color
- Accessible controls outside map interactions where practical

---

## Error Handling

Errors should tell the user what happened and what they can do next.

Preferred:

```text
Route could not be calculated

Verify the pickup and destination and try again.
```

Avoid generic messages such as `Request failed.`

Deployment errors should not become end-user developer setup tasks.

---

## Route and Safety Limitations

Baleport is a planning application.

It does not guarantee:

- Legal route access
- Commercial vehicle accessibility
- Clearance accuracy
- Road availability
- Current construction status
- Bridge suitability
- Weight compliance
- Licensing compliance
- Insurance compliance

Routing-provider coverage varies, and temporary conditions may not be represented.

Drivers and operators remain responsible for posted signage, current road conditions, vehicle ratings, actual vehicle dimensions and weight, cargo securement, applicable laws, and safe operation.

---

## Non-CDL Positioning

Baleport is designed for non-CDL freight workflows.

The application does **not** determine whether a specific vehicle, combination, trailer, shipment, cargo type, route, or operation legally requires a commercial driver's license or other regulatory authority.

Operators are responsible for verifying applicable licensing and transportation requirements.

---

## Estimate Disclaimer

Baleport produces planning estimates.

Calculated prices should not automatically be treated as guaranteed rates, market-rate quotations, final invoices, or binding contracts unless the operator independently chooses to use the result that way.

---

## Development Principles

When contributing to Baleport:

### Keep it lightweight

Prefer HTML, CSS, Vanilla JavaScript, and Apps Script. Avoid unnecessary frameworks.

### Keep routing transparent

Route alerts, constraints, and assumptions should remain visible.

### Keep estimates auditable

Operators should be able to understand how the estimate was calculated.

### Keep infrastructure invisible to the user

Users use Baleport. Administrators configure APIs.

### Keep credentials out of project state

Runtime configuration and user project data must remain separate.

### Preserve field usability

Features should work well from phones, tablets, laptops, and pickup-mounted devices.

---

## Suggested Roadmap

### Project Management

- `.ra` Save Project
- `.ra` Open Project
- Duplicate Project
- Unsaved-change detection
- Session recovery

### Customer and Facility Tools

- Customer contact book
- Saved pickup facilities
- Saved delivery facilities
- Facility notes
- Dock and gate instructions

### Dispatch

- Driver assignment
- Dispatch status
- Pickup confirmation
- Delivery confirmation
- Proof of delivery

### Pricing

- Multiple saved rate cards
- Accessorial charges
- Detention pricing
- Wait-time pricing
- Fuel-price integration
- Customer-specific pricing

### Routing

- Round-trip routing
- Return-to-origin
- Delivery windows
- Service time per stop
- Custom route hazards
- Commercial bridge/clearance data integration
- More advanced route optimization

### Reporting

- Server-generated PDF quote
- Branded customer estimate
- Quote acceptance
- Job summary
- Dispatch packet

### Integrations

- Webhooks
- CRM
- TMS integrations
- Accounting tools
- External fuel data
- Commercial routing providers

---

## Development Checklist

### Routing

- [ ] Pickup search works
- [ ] Destination search works
- [ ] Intermediate stops work
- [ ] Route calculation works
- [ ] Alternative routes work where available
- [ ] Stop optimization works where supported
- [ ] Route constraints are correctly passed
- [ ] Route alerts display correctly

### Estimating

- [ ] Mileage calculation is correct
- [ ] Time calculation is correct
- [ ] Base rate works
- [ ] Per-mile rate works
- [ ] Time rate works
- [ ] Additional-stop fee works
- [ ] Fuel adjustment works
- [ ] Rush markup works
- [ ] Minimum charge works
- [ ] Payload validation works

### Directions

- [ ] Turn-by-turn directions render
- [ ] Legs are grouped correctly
- [ ] Direction editing works
- [ ] Reset-to-original works
- [ ] Map focus works where implemented
- [ ] Edited directions export correctly

### Export / Share

- [ ] TXT export works
- [ ] CSV export works
- [ ] Print layout works
- [ ] Browser PDF workflow works
- [ ] Copy Summary works
- [ ] Email sharing works
- [ ] Email validation works
- [ ] Mail quota failures are handled cleanly

### Security

- [ ] No end-user Mapbox-token field exists
- [ ] `MAPBOX_ACCESS_TOKEN` comes from Script Properties
- [ ] Private secrets remain server-side
- [ ] Script Properties are explicitly allowlisted
- [ ] No credentials enter browser storage
- [ ] No credentials enter exports
- [ ] No credentials enter share links
- [ ] No credentials enter project files

### Mobile

- [ ] Phone layout is usable
- [ ] Map remains usable
- [ ] Route controls remain accessible
- [ ] Directions remain readable
- [ ] Touch targets remain practical
- [ ] No critical horizontal overflow exists

---

## Contributing

Contributions should preserve Baleport's core product philosophy:

> Make professional freight planning simpler without hiding the assumptions that affect the result.

When submitting changes:

1. Keep dependencies minimal.
2. Avoid exposing credentials.
3. Preserve mobile usability.
4. Preserve Mapbox routing behavior.
5. Keep estimate logic transparent.
6. Avoid regulatory claims.
7. Test Apps Script deployment behavior.
8. Test iframe/Google Sites behavior where relevant.

---

## License

Add the appropriate license for this repository before public distribution.

If Baleport is intended to remain proprietary, replace this section with the applicable proprietary-use notice.

If an open-source license is selected, include the corresponding `LICENSE` file in the repository.

---

## Support

Add the official Baleport or RanchAssist support URL/email here once finalized.

Suggested repository documentation structure:

```text
README.md
README_SETUP.md
SECURITY.md
PRIVACY.md
TERMS.md
LICENSE
```

---

## About Baleport

Baleport is part of a broader effort to create focused, practical software utilities for real-world field and operations workflows.

Rather than turning every logistics function into a large enterprise platform, Baleport focuses on one important workflow:

```text
Shipment request
      ↓
Route planning
      ↓
Vehicle + road constraints
      ↓
Freight estimate
      ↓
Route review
      ↓
Turn-by-turn dispatch sheet
      ↓
Export / print / share
```

The goal is simple:

**Less guesswork. Better route decisions. Cleaner handoffs.**
