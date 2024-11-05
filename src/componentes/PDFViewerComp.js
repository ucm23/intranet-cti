import { useState } from "react";
import PropTypes from 'prop-types';
import { Document, Page } from 'react-pdf';
import { Col, Row, Container } from 'react-bootstrap';

const PDFViewerComp = ({ file }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }

    const changePage = (number) => {
        if (number <= numPages && number >= 1) setPageNumber(number);
    }

    return (
        <Container fluid className="pdf-container">
            <Row className="pdf-row">
                <Col className="pdf-col">
                    <Document
                        file={file?.data}
                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        <Page pageNumber={pageNumber} width={window.innerWidth} />
                    </Document>
                </Col>
            </Row>
        </Container>
    );
}

PDFViewerComp.propTypes = {
    file: PropTypes.object.isRequired
}

export default PDFViewerComp;
