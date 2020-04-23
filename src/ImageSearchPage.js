import React from 'react';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import './ImageSearchPage.css';
import { searchPhotos } from './requests';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Figure from 'react-bootstrap/Figure'
let page = 1;
const schema = yup.object({
  query: yup.string().required('Query is required'),
});
function ImageSearchPage() {
  const [items, setItems] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [keyword, setKeyword] = useState('');
const handleSubmit = async (evt) => {
    const isValid = await schema.validate(evt);
    if (!isValid) {
      return;
    }
    const data = {
      q: encodeURIComponent(evt.query),
      image_type: 'photo',
      page
    }
    const response = await searchPhotos(data);
    setTotalHits(response.data.totalHits);
    setItems(items.concat(response.data.hits));
    setKeyword(evt.query);
  }
const getMorePhotos = async () => {
    page++;
    const data = {
      q: encodeURIComponent(keyword),
      image_type: 'photo',
      page
    }
    const response = await searchPhotos(data);
    setTotalHits(response.data.totalHits);
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
                    <h4>Image Search</h4>
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
      <InfiniteScroll
        pageStart={page}
        loadMore={getMorePhotos}
        hasMore={totalHits > items.length}
        threshold={100}
      >
        {items.map((i, index) =>
          <Figure key={index}>
            <Figure.Image
              width={window.innerWidth / 3.5}
              src={i.previewURL}
            />
          </Figure>
        )}
      </InfiniteScroll>
    </div>
  );
}
export default ImageSearchPage;