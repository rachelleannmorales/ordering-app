import DangerButton from '@/Components/DangerButton';
import TextInput from '@/Components/TextInput';
import { Table } from 'antd';

export default function AddProductTable({ data = [], handleQuantityChange, handleRemoveProduct }) {
    const columns = [
        {
          title: "Product Name",
          dataIndex: ['product','name'],
          key: ['product','name'],
        },
        {
          title: "Quantity",
          dataIndex: "quantity",
          key: "quantity",
          render: (text, record, index) => (
            <TextInput
              key={`qty${index}`}
              type="number"
              min={1}
              max={record.product.quantity}
              defaultValue={text}
              onChange={(e) =>
                handleQuantityChange(e, record.product)
              }
            />
          ),
        },
        {
          title: "Unit Price",
          dataIndex: ['product','price'],
          key: ['product','price'],
        },
        {
          title: "Total",
          dataIndex: "amount",
          key: "amount",
          render: (text, _record, index) => (
            <span key={`amt${index}`}>{text}</span>
          ),
        },
        {
          title: "Action",
          dataIndex: "",
          key: "x",
          render: (_, _record, index) => (
            <DangerButton
              onClick={(e) => handleRemoveProduct(e, index)}
            >
              Remove
            </DangerButton>
          ),
        },
      ];

    return (
        <Table columns={columns} dataSource={data}/>
    );
}
