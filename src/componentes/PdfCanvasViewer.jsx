import React, { useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist/webpack';

const PdfCanvasViewer = ({ url }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadPdf = async () => {
      const loadingTask = pdfjsLib.getDocument(url);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      const scale = 1.5;
      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      page.render(renderContext);
    };

    loadPdf();
  }, [url]);

  return <canvas ref={canvasRef} />;
};

export default PdfCanvasViewer;
