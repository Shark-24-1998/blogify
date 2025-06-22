export async function POST(req) {
  const clientFormData = await req.formData();
  const file = clientFormData.get("file");

  if (!file) {
    return new Response(JSON.stringify({ error: "No file provided." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const externalApiFormData = new FormData();
  // The external API expects the field name to be 'files'
  externalApiFormData.append("files", file);

  try {
    const apiRes = await fetch("https://writers.explorethebuzz.com/api/upload", {
      method: "POST",
      body: externalApiFormData,
      // Add Authorization headers here if needed, e.g.:
      // headers: {
      //   'Authorization': `Bearer ${process.env.YOUR_API_TOKEN}`
      // }
    });

    if (!apiRes.ok) {
      // Forward the error from the external API
      const errorText = await apiRes.text();
      return new Response(JSON.stringify({ error: `API Error: ${errorText}` }), {
        status: apiRes.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await apiRes.json();

    // The response is an array, get the URL from the first element
    if (Array.isArray(data) && data.length > 0 && data[0].url) {
      const imageUrl = "https://writers.explorethebuzz.com" + data[0].url;
      console.log("Successfully uploaded image. URL:", imageUrl);
      return new Response(JSON.stringify({ url: imageUrl }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      // Handle unexpected response format
      console.error("Upload failed: Invalid response format from external API.", data);
      return new Response(
        JSON.stringify({ error: "Invalid response format from external API." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error forwarding file upload:", error);
    return new Response(
      JSON.stringify({ error: "An internal server error occurred." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
} 