import { Table } from 'antd';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

export default function TransactionsTable({order}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    const response = await fetch(`/orders/${order.id}/transactions?page=${page}`);
    const newData = await response.json();

    setData([...data, ...newData.data]);
    setPage(prevPage => prevPage + 1);
    setHasMore(newData.next_page_url !== null);
    setLoading(false);
  };

  const handleLoadMore = () => {
    if (loading || !hasMore) {
      return;
    }
    loadData();
  };

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
          <div className="py-5 container"  style={{ display: 'block', height: '300px', overflow: 'auto' }}>
            <InfiniteScroll
              pageStart={1}
              loadMore={handleLoadMore}
              hasMore={hasMore}
              useWindow={false}
            >
              <Table 
                columns={columns} 
                dataSource={data}  
                loading={loading}
                pagination={false} />
            </InfiniteScroll>
        </div>
      </div>
    );
}
