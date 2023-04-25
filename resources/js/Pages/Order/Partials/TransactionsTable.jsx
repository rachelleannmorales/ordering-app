import { Table } from 'antd';

export default function TransactionsTable({ data = [] }) {
    const columns = [
        {
          title: "Transaction ID",
          dataIndex: 'transaction_id',
          key: 'transaction_id',
        },
        {
          title: "Payment method",
          dataIndex: "payment_method",
          key: "payment_method"
        },
        {
          title: "Status",
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: "Created At",
          dataIndex: "created_at",
          key: "created_at",
        }
      ];

    return (
      <div>
          <header>
              <h2 className="text-lg font-medium text-gray-900">Transactions</h2>
          </header>
          <div className="py-5">
          <Table columns={columns} dataSource={data}/>
        </div>
      </div>
    );
}
