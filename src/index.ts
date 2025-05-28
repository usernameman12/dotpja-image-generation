export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const queryPrompt = url.searchParams.get("q") || "red, purple, blue cool s shaped logo, with a gray backsround.";

    const inputs = {
      prompt: queryPrompt,
    };

    const response = await env.AI.run(
      "@cf/stabilityai/stable-diffusion-xl-base-1.0",
      inputs
    );

    const imageData = response instanceof ArrayBuffer
      ? new Uint8Array(response)
      : response;

    return new Response(imageData, {
      headers: {
        "Content-Type": "image/png",
      },
    });
  },
} satisfies ExportedHandler;
