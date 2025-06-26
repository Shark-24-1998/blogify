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
    const apiRes = await fetch("https://writers.explorethebuzz.com/api/upload", {
      method: "POST",
      body: externalApiFormData,
      // headers: {
      //   Authorization: `Bearer ${process.env.YOUR_API_KEY}`, // if needed
      // },
    });

    if (!apiRes.ok) {
      const errorText = await apiRes.text();
      return new Response(JSON.stringify({ error: `API Error: ${errorText}` }), {
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
    // Call your external API to delete the image by ID
    const apiRes = await fetch(`https://writers.explorethebuzz.com/api/upload/${imageId}`, {
      method: "DELETE",
      // headers: { Authorization: `Bearer ${process.env.YOUR_API_KEY}` }, // if needed
    });

    if (!apiRes.ok) {
      const errorText = await apiRes.text();
      return new Response(JSON.stringify({ error: `API Error: ${errorText}` }), {
        status: apiRes.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
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
