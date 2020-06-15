import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import {
  Button,
  Form,
  Icon,
  Input,
  InputNumber,
  Layout,
  Radio,
  Typography,
  Upload,
} from 'antd';
import { Container, LoadingSpin } from 'lib/components';
import { FormContent } from './Host.style';
import { HOST_LISTING } from '../../lib/graphql/mutations';
import { displayErrorMessage, displaySuccessNotification } from 'lib/utils';
import { AuthContext } from 'lib/context/AuthProvider';
import useScrollToTop from 'lib/hooks/useScrollToTop';

const { Content } = Layout;
const { Text, Title } = Typography;
const { Item } = Form;

const Host = ({ form }) => {
  useScrollToTop();

  const { viewer } = useContext(AuthContext);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageBase64Value, setImageBase64Value] = useState(null);

  const [hostListing, { loading, data }] = useMutation(HOST_LISTING, {
    onCompleted: () => {
      displaySuccessNotification("You've successfully created your listing!");
    },
    onError: () => {
      displayErrorMessage(
        "Sorry! We weren't able to create your listing. Please try again later."
      );
    },
  });

  const getBase64Value = (img, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => {
      callback(reader.result);
    };
  };

  const handleImageUpload = (info) => {
    const { file } = info;

    if (file.status === 'uploading') {
      setImageLoading(true);
      return;
    }

    if (file.status === 'done' && file.originFileObj) {
      getBase64Value(file.originFileObj, (imageBase64Value) => {
        setImageBase64Value(imageBase64Value);
        setImageLoading(false);
      });
    }
  };

  const handleHostListing = (evt) => {
    evt.preventDefault();

    form.validateFields((err, values) => {
      if (err) {
        displayErrorMessage('Please complete all required form fields!');
        return;
      }

      const fullAddress = `${values.address}, ${values.city}, ${values.state}, ${values.postalCode}`;

      const input = {
        ...values,
        address: fullAddress,
        image: imageBase64Value,
        price: values.price * 100,
      };
      delete input.city;
      delete input.state;
      delete input.postalCode;

      hostListing({
        variables: {
          input,
        },
      });
    });
  };

  if (!viewer.id || !viewer.hasWallet) {
    return (
      <FormContent>
        <Container className='host__container'>
          <div className='host__form-header'>
            <Title level={4} className='host__form-title'>
              You'll have to be signed in and connected with Stripe to host a
              listing!
            </Title>
            <Text type='secondary'>
              We only allow users who've signed in to our application and have
              connected with Stripe to host new listings. You can sign in at the
              <Link to='/login'>/login</Link> page and connect with Stripe
              shortly after.
            </Text>
          </div>
        </Container>
      </FormContent>
    );
  }

  if (loading) {
    return (
      <Content className='host-content'>
        <LoadingSpin message="Please Wait! We're creating your listing now..." />
      </Content>
    );
  }

  if (data && data.hostListing) {
    return <Redirect to={`/listing/${data.hostListing.id}`} />;
  }

  const { getFieldDecorator } = form;

  return (
    <FormContent>
      <Form layout='vertical' onSubmit={handleHostListing}>
        <div>
          <Title level={3} className='host__form-title'>
            Hi! Let's get started listing your place.
          </Title>
          <Text type='secondary'>
            In this form, we'll collect some basic and additional information
            about your listing.
          </Text>
        </div>

        <Item label='Max # of Guests'>
          {getFieldDecorator('guests', {
            rules: [
              {
                required: true,
                message: 'Please enter a max number of guests!',
              },
            ],
          })(<InputNumber min={1} placeholder='4' />)}
        </Item>

        <Item label='Title' extra='Max character count of 45'>
          {getFieldDecorator('title', {
            rules: [
              {
                required: true,
                message: 'Please enter a title for your listing!',
              },
            ],
          })(
            <Input
              maxLength={45}
              placeholder='The iconic and luxurious Bel-Air mansion'
            />
          )}
        </Item>

        <Item label='Description of listing' extra='Max character count of 400'>
          {getFieldDecorator('description', {
            rules: [
              {
                required: true,
                message: 'Please enter a description for your listing!',
              },
            ],
          })(
            <Input.TextArea
              rows={3}
              maxLength={400}
              placeholder='Modern, clean, and iconic home of the Fresh Prince. Situated in the heart of Bel-Air, Los Angeles.'
            />
          )}
        </Item>

        <Item label='Address'>
          {getFieldDecorator('address', {
            rules: [
              {
                required: true,
                message: 'Please enter a address for your listing!',
              },
            ],
          })(<Input placeholder='251 North Bristol Avenue' />)}
        </Item>

        <Item label='City/Town'>
          {getFieldDecorator('city', {
            rules: [
              {
                required: true,
                message: 'Please enter a city (or region) for your listing!',
              },
            ],
          })(<Input placeholder='Los Angeles' />)}
        </Item>

        <Item label='State/Province'>
          {getFieldDecorator('state', {
            rules: [
              {
                required: true,
                message: 'Please enter a state (or province) for your listing!',
              },
            ],
          })(<Input placeholder='California' />)}
        </Item>

        <Item label='Zip/Postal Code'>
          {getFieldDecorator('postalCode', {
            rules: [
              {
                required: true,
                message:
                  'Please enter a zip (or postal) code for your listing!',
              },
            ],
          })(<Input placeholder='Please enter a zip code for your listing!' />)}
        </Item>

        <Item
          label='Image'
          extra='Images have to be under 1MB in size and of type JPG or PNG'
        >
          <div className='host__form-image-upload'>
            {getFieldDecorator('image', {
              rules: [
                {
                  required: true,
                  message: 'Please enter provide an image for your listing!',
                },
              ],
            })(
              <Upload
                name='image'
                listType='picture-card'
                showUploadList={false}
                action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                beforeUpload={beforeImageUpload}
                onChange={handleImageUpload}
              >
                {imageBase64Value ? (
                  <img src={imageBase64Value} alt='Listing' />
                ) : (
                  <div>
                    <Icon type={imageLoading ? 'loading' : 'plus'} />
                    <div className='ant-upload-text'>Upload</div>
                  </div>
                )}
              </Upload>
            )}
          </div>
        </Item>

        <Item label='Price' extra='All prices in $USD/day'>
          {getFieldDecorator('price', {
            rules: [
              {
                required: true,
                message: 'Please enter a price for your listing!',
              },
            ],
          })(<InputNumber min={0} placeholder='120' />)}
        </Item>

        <Item label='Wifi'>
          {getFieldDecorator('wifi', {
            rules: [
              {
                required: true,
                message: 'Please select Wifi Availablity!',
              },
            ],
          })(
            <Radio.Group>
              <Radio.Button value={true}>
                <span>Available</span>
              </Radio.Button>
              <Radio.Button value={false}>
                <span>None</span>
              </Radio.Button>
            </Radio.Group>
          )}
        </Item>
        <Item label='Parking'>
          {getFieldDecorator('parking', {
            rules: [
              {
                required: true,
                message: 'Please select Parking Availablity!',
              },
            ],
          })(
            <Radio.Group>
              <Radio.Button value={true}>
                <span>Available</span>
              </Radio.Button>
              <Radio.Button value={false}>
                <span>None</span>
              </Radio.Button>
            </Radio.Group>
          )}
        </Item>
        <Item label='Pool'>
          {getFieldDecorator('pool', {
            rules: [
              {
                required: true,
                message: 'Please select Pool Availablity!',
              },
            ],
          })(
            <Radio.Group>
              <Radio.Button value={true}>
                <span>Available</span>
              </Radio.Button>
              <Radio.Button value={false}>
                <span>None</span>
              </Radio.Button>
            </Radio.Group>
          )}
        </Item>
        <Item label='Air Conditioner'>
          {getFieldDecorator('airCon', {
            rules: [
              {
                required: true,
                message: 'Please select Air Conditioner Availablity!',
              },
            ],
          })(
            <Radio.Group>
              <Radio.Button value={true}>
                <span>Available</span>
              </Radio.Button>
              <Radio.Button value={false}>
                <span>None</span>
              </Radio.Button>
            </Radio.Group>
          )}
        </Item>

        <Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Item>
      </Form>
    </FormContent>
  );
};

const beforeImageUpload = (file) => {
  const fileIsValidImage =
    file.type === 'image/jpeg' || file.type === 'image/png';
  const fileIsValidSize = file.size / 1024 / 1024 < 1;

  if (!fileIsValidImage) {
    displayErrorMessage("You're only able to upload valid JPG or PNG files!");
    return false;
  }

  if (!fileIsValidSize) {
    displayErrorMessage(
      "You're only able to upload valid image files of under 1MB in size!"
    );
    return false;
  }

  return fileIsValidImage && fileIsValidSize;
};

const WrappedHost = Form.create({
  name: 'host_form',
})(Host);

export default WrappedHost;
