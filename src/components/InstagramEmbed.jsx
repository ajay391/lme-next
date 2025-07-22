// components/InstagramEmbed.js
import { useEffect } from "react";

const InstagramEmbed = ({ url }) => {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, []);

  return (
    <div
      className="w-full max-w-[360px] flex-shrink-0"
      dangerouslySetInnerHTML={{
        __html: `
        <blockquote class="instagram-media" data-instgrm-permalink="${url}" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px rgba(0,0,0,0.5); margin:1px; min-width:326px; max-width:360px; padding:0; width:100%;">
        </blockquote>
      `,
      }}
    />
  );
};

export default InstagramEmbed;
