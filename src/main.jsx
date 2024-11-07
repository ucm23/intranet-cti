import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css'
import { ImageCacheProvider } from './redux/ImageCacheProvider';
import { PreviewFileProvider } from './redux/PreviewFileContext';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  window.location.href,
).toString();

ReactDOM.render(
    <StrictMode>
        <ChakraProvider>
            <BrowserRouter>
                <ImageCacheProvider>
                    <PreviewFileProvider>
                        <App />
                    </PreviewFileProvider>
                </ImageCacheProvider>
            </BrowserRouter>
        </ChakraProvider>
    </StrictMode>,
    document.getElementById('root')
);