(() => {
  // src/index.js
  addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
  });
  async function handleRequest(request) {
    const url = new URL(request.url);
    const path = url.pathname;
    if (path === "/popular-domains") {
      const csvUrl = "https://raw.githubusercontent.com/lauragift21/hiring-submission-data/main/top-domain.csv";
      const response = await fetch(csvUrl);
      const csvData = await response.text();
      const lines = csvData.split("\n");
      const headers = lines[0].split(",");
      const result = [];
      for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split(",");
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentLine[j];
        }
        result.push(obj);
      }
      const jsonData = JSON.stringify({ rankingEntries: result });
      myNamespace.put("popular-domains", JSON.stringify(jsonData));
      const getData = myNamespace.get("popular-domains");
      return new Response(jsonData, { headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" } });
    } else if (path === "/attack-layer3") {
      const csvUrl = "https://raw.githubusercontent.com/lauragift21/hiring-submission-data/main/attack-layer3-traffic.csv";
      const response = await fetch(csvUrl);
      const csvData = await response.text();
      const lines = csvData.split("\n");
      const headers = lines[0].split(",");
      const result = [];
      for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split(",");
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentLine[j];
        }
        result.push(obj);
      }
      const jsonData = JSON.stringify(result);
      myNamespace.put("attack-layer3", JSON.stringify(jsonData));
      const getData = myNamespace.get("attack-layer3");
      return new Response(jsonData, { headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" } });
    } else if (path === "/traffic-change") {
      const csvUrl = "https://raw.githubusercontent.com/lauragift21/hiring-submission-data/main/internet-traffic.csv";
      const response = await fetch(csvUrl);
      const csvData = await response.text();
      const lines = csvData.split("\n");
      const headers = lines[0].split(",");
      const result = [];
      for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split(",");
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentLine[j];
        }
        result.push(obj);
      }
      const jsonData = JSON.stringify(result);
      myNamespace.put("attack-layer3", JSON.stringify(jsonData));
      const getData = myNamespace.get("attack-layer3");
      return new Response(jsonData, { headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" } });
    } else {
      return new Response("Not found", { status: 404 });
    }
  }
})();
//# sourceMappingURL=index.js.map
