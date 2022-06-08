import { Button, Form, Input } from 'antd';
import toast from 'react-hot-toast';
import { useState, useCallback } from 'react';
import { usePostPages } from '@/lib/post';
import { fetcher } from '@/lib/fetch';

const { TextArea } = Input;

const PosterInner = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const { mutate } = usePostPages();

  const onFinish = useCallback(
    async (values) => {
      try {
        setIsLoading(true);
        await fetcher('/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        toast.success('You have posted successfully');
        form.resetFields();
        // refresh post lists
        mutate();
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    [mutate]
  );

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="add-post-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout='vertical'
      form={form}
    >
      <Form.Item
        name="title"
        rules={[{ required: true, message: 'Please input post\'s title!' }]}
      >
        <Input placeholder={`What's on your post title, ${user.name}?`} />
      </Form.Item>

      <Form.Item
        name="content"
        rules={[{ required: true, message: 'Please input post\'s content!' }]}
      >
        <TextArea rows={5} placeholder={`What's on your post content, ${user.name}?`} />
      </Form.Item>

      <Form.Item style={{ textAlign: 'center', margin: 0 }}>
        <Button type="primary" htmlType="submit" shape="round" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
};

export default PosterInner;