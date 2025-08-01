// ElevenLabsAgent.js
import { useEffect, useRef } from "react";

interface ElevenLabsAgentProps {
  agentId: string;
  userName: string;
  learningMaterial: string;
}

const ElevenLabsAgent = ({ agentId, userName, learningMaterial }: ElevenLabsAgentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if script already exists
    if (!document.getElementById("elevenlabs-widget-script")) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      script.async = true;
      script.type = "text/javascript";
      script.id = "elevenlabs-widget-script";
      document.body.appendChild(script);
    }

    // Inject widget HTML manually
    if (containerRef.current && !containerRef.current.querySelector("elevenlabs-convai")) {
      const widget = document.createElement("elevenlabs-convai");
      const dynamicVariables = { "user_name": userName, "learning_material": learningMaterial };
      widget.setAttribute("agent-id", agentId);
      widget.setAttribute("dynamic-variables", JSON.stringify(dynamicVariables));
    //   if (userName && learningMaterial) widget.setAttribute("user_name", userName);
    //   if (learningMaterial) widget.setAttribute("learning_material", learningMaterial);
      containerRef.current.appendChild(widget);
    }
  }, [agentId]);

  return <div ref={containerRef}></div>;
};

export default ElevenLabsAgent;
