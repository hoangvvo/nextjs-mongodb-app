import { Button, Form, Input, Space } from 'antd';
import toast from 'react-hot-toast';
import { useState, useCallback } from 'react';
import { usePostPages } from '@/lib/post';
import { fetcher } from '@/lib/fetch';

const { TextArea } = Input;

const PosterInner = ({ user = {}, post = {}, save = () => { }, cancel = () => { } }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const editMode = post._id;

  const { mutate } = usePostPages();

  const onFinish = useCallback(
    async (values) => {
      try {
        setIsLoading(true);
        const requestBody = editMode ? { ...values, id: post._id } : values;
        const msg = editMode ? 'You have saved successfully' : 'You have posted successfully';
        await fetcher('/api/posts', {
          method: editMode ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        });
        toast.success(msg);
        form.resetFields();
        // refresh post lists
        mutate();
        save();
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
        initialValue={post.title}
      >
        <Input placeholder={`What's on your post title, ${user.name}?`} />
      </Form.Item>

      <Form.Item
        name="content"
        rules={[{ required: true, message: 'Please input post\'s content!' }]}
        initialValue={post.content}
      >
        <TextArea rows={5} placeholder={`What's on your post content, ${user.name}?`} />
      </Form.Item>

      <Form.Item style={{ textAlign: 'center', margin: 0 }}>
        <Space>
          <Button type="primary" htmlType="submit" shape="round" loading={isLoading}>
            {editMode ? 'Save' : 'Submit'}
          </Button>
          {
            editMode && (
              <Button shape="round" loading={isLoading} onClick={cancel}>
                Cancel
              </Button>
            )
          }
        </Space>
      </Form.Item>
    </Form>
  )
};

export default PosterInner;