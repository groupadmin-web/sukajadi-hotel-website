export default {
  async fetch(request, env, ctx) {
    const accept = request.headers.get("Accept") || "";

    const wantsMarkdown = accept
      .split(",")
      .map((v) => v.trim().toLowerCase())
      .some((v) => v.startsWith("text/markdown"));

    if (!wantsMarkdown) {
      return fetch(request);
    }

    const upstream = await fetch(request);
    const contentType = upstream.headers.get("Content-Type") || "";

    if (!contentType.toLowerCase().includes("text/html")) {
      return upstream;
    }

    const html = await upstream.text();
    const markdown = "```html\n" + html + "\n```";

    const headers = new Headers(upstream.headers);
    headers.set("Content-Type", "text/markdown; charset=utf-8");
    headers.set("Vary", "Accept");
    headers.set("x-markdown-tokens", String(Math.ceil(markdown.length / 4)));

    return new Response(markdown, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers,
    });
  },
};
