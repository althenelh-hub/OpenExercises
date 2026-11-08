```mermaid
sequenceDiagram
  note left of browser: store note in notes array and redraw page
  browser->>server:POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
  activate server
  note right of server: store note in the server
  server->>browser:{"message": "note created"}
  deactivate server
  note left of browser: diplay response message in console or trigger alert for offensive word
```
