import React, { useState } from "react";
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import isUrlHttp from 'is-url-http';

 function CreateArea() {

const [url, setUrl] = useState('');
const [link, setLink] = useState()
const [barcodeImage, setBarcodeImage] = useState('');
const [isValidUrl, setisValidUrl] = useState('')

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    
    if(isUrlHttp(url)){

      //axiosgit 
      const response = await axios.post('http://localhost:8080/generateBarcode', {url}, { responseType: 'arraybuffer' });
      const blob = new Blob([response.data], { type: 'image/png' });
      const barcodeUrl = URL.createObjectURL(blob);
      setBarcodeImage(barcodeUrl);
      setLink(url);
      
    }else{
      setisValidUrl("Invalid URL")
      setLink(url);
    }
  
   

  } catch (error) {
    console.error(error);
  }
  setUrl("")
};

  return (
    <Container>
      <Row className="m-5 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <div className="border border-3 border-primary"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-4">
                <h2 className="fw-bold mb-2 text-center text-uppercase">URL to Barcode </h2>
                
                <Form onSubmit={handleSubmit} className="mb-3">
                <Form.Group className="mb-3">
                <Form.Control
                type="text" 
                placeholder="Enter URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)} />
                </Form.Group>

                  <div className="d-grid">
                    <Button variant="primary" type="submit">
                      Generate Barcode
                    </Button>
                  </div>

                </Form>
               <div className="rounded mx-auto d-flex flex-column align-items-center justify-content-center">
                    {barcodeImage && <img src={barcodeImage} alt="Barcode" />}
                    <p>{link}</p>
                    {isValidUrl}
               </div>
               
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateArea;