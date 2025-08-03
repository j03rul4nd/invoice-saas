import { PDF_PROCESSING } from "./constants";
import type { TextContent } from "pdfjs-dist/types/src/display/api";

// Variable para cache del módulo PDF.js
let pdfjsModule: any = null;

// Función para cargar PDF.js solo cuando se necesite
const getPDFJS = async () => {
  if (!pdfjsModule) {
    // Verificar que estamos en el navegador
    if (typeof window === 'undefined') {
      throw new Error('PDF processing is only available in the browser');
    }
    
    // Importación dinámica que solo se ejecuta en el cliente
    pdfjsModule = await import('pdfjs-dist');
    
    // Configurar el worker
    if (!pdfjsModule.GlobalWorkerOptions.workerSrc) {
      pdfjsModule.GlobalWorkerOptions.workerSrc = PDF_PROCESSING.WORKER_SRC;
      console.log(`PDF.js version: ${pdfjsModule.version}`);
    }
  }
  
  return pdfjsModule;
};

export const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    // Cargar PDF.js dinámicamente
    const pdfjs = await getPDFJS();
    
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjs.getDocument({
      data: arrayBuffer,
      useWorkerFetch: false,
      isEvalSupported: false,
      useSystemFonts: true
    });

    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;
    let text = '';
    
    const pagePromises = Array.from({ length: numPages }, (_, i) => i + 1)
      .map(async (pageNum) => {
        const page = await pdf.getPage(pageNum);
        const content = await page.getTextContent() as TextContent;
        
        return content.items
          .map(item => 'str' in item ? item.str : '')
          .join(' ');
      });

    const pageTexts = await Promise.all(pagePromises);
    text = pageTexts.join('\n');

    return text;
  } catch (error) {
    console.error('PDF extraction failed:', error);
    throw new Error(error instanceof Error ? `Failed to extract text from PDF: ${error.message}` : 'Failed to extract text from PDF');
  }
};