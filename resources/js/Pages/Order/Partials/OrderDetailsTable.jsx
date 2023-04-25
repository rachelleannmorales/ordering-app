import { Table } from 'antd';

export default function OrderDetailsTable({ data = [] }) {
    const columns = [
        {
          title: "Product Name",
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: "Quantity",
          dataIndex: ['pivot','quantity'],
          key: ['pivot','quantity'],
        },
        {
          title: "Unit Price",
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: "Total",
          dataIndex: "amount",
          key: "amount",
          render: (text, record, index) => (
            <span key={`amt${index}`}>{record.price * record.pivot.quantity}</span>
          ),
        },
      ];

    return (
      <div>
          <header>
              <h2 className="text-lg font-medium text-gray-900">Order Details</h2>
          </header>
          <div className="py-2">
          <Table columns={columns} dataSource={data}/>
        </div>
      </div>
    );
}
