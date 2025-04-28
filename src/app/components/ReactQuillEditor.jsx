"use client";

import dynamic from "next/dynamic";

// This ensures ReactQuill never renders on the server
const ReactQuill = dynamic(() => import("react-quill-new"), { 
    ssr: false 
});

// import "react-quill-new/dist/quill.snow.css";

export default ReactQuill;


// AI Assist