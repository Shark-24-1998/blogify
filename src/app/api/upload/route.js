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
  externalApiFormData.append("files", file); // field name must be "files"

  try {
    const apiRes = await fetch("https://writers.explorethebuzz.com/api/upload?files", {
      method: "POST",
      body: externalApiFormData,
      headers: {
        Authorization: `Bearer ${process.env.EXTERNAL_API_KEY}`,
      },
    });

    // Log status and response body for debugging
    const debugText = await apiRes.clone().text();
    console.log('External API status:', apiRes.status);
    console.log('External API response body:', debugText);

    if (!apiRes.ok) {
      return new Response(JSON.stringify({ error: `API Error: ${debugText}` }), {
        status: apiRes.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await apiRes.json();
    console.log("Full response from external API:", data);

    if (Array.isArray(data) && data.length > 0 && data[0].url && data[0].name) {
      const imageUrl = "https://writers.explorethebuzz.com" + data[0].url;
      const imageName = data[0].hash + data[0].ext;
      const imageId = data[0].id;

      return new Response(JSON.stringify({ 
        url: imageUrl, 
        name: imageName,
        id: imageId
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      console.error("Invalid response format:", data);
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

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const imageId = searchParams.get('id');

  if (!imageId) {
    return new Response(JSON.stringify({ error: "No image id provided." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const apiRes = await fetch(`https://writers.explorethebuzz.com/api/upload/files/${imageId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.EXTERNAL_API_KEY}`,
      },
    });

    const contentType = apiRes.headers.get("content-type");
    const responseText = await apiRes.text();
    console.log("External API DELETE status:", apiRes.status);
    console.log("External API DELETE response body:", responseText);

    if (!apiRes.ok) {
      return new Response(JSON.stringify({ error: `API Error: ${responseText}` }), {
        status: apiRes.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Only try to parse as JSON if the response is JSON
    let data = null;
    if (contentType && contentType.includes("application/json")) {
      data = JSON.parse(responseText);
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    return new Response(
      JSON.stringify({ error: "An internal server error occurred." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
