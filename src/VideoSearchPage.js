import React from 'react';
//import './VideoSearchPage.css';
import { searchVideos } from './requests';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import './ImageSearchPage.css';
import { useState } from 'react';
import Figure from 'react-bootstrap/Figure'
const schema = yup.object({
  query: yup.string().required('Query is required'),
});
function VideoSearchPage() {
  const [items, setItems] = useState([]);
const handleSubmit = async (evt) => {
    const isValid = await schema.validate(evt);
    if (!isValid) {
      return;
    }
    const data = {
      q: encodeURIComponent(evt.query),
      page: 1
    }
    const response = await searchVideos(data);
    setItems(items.concat(response.data.hits));
  }
return (
    <div className="ImageSearchPage">
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isInvalid,
          errors,
        }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} md="12" controlId="firstName">
                  <Form.Label>
                    <h4>Video Search</h4>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="query"
                    placeholder="Keyword"
                    value={values.query || ''}
                    onChange={handleChange}
                    isInvalid={touched.description && errors.query}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.query}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Button type="submit">Search</Button>
            </Form>
          )}
      </Formik>
      {items.map((i, index) =>
        <Figure key={index}>
          <video
            width={window.innerWidth / 3.5}
          >
            <source src={i.videos.tiny.url} type="video/mp4" />
          </video>
        </Figure>
      )}
    </div>
  );
}
export default VideoSearchPage;