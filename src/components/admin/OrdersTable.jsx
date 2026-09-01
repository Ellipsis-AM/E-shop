function OrdersTable ({
    orders
}) {
    return(
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                        <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                        <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                        <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700">Address</th>
                        <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                        <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                        <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                    <tr key={order.id} className="hover:bg-green-50">
                        <td className="border-b px-4 py-3 text-sm text-gray-700">{order.id}</td>
                        <td className="border-b px-4 py-3 text-sm text-gray-700">{order.customer_name}</td>
                        <td className="border-b px-4 py-3 text-sm text-gray-700">{order.customer_phone}</td>
                        <td className="border-b px-4 py-3 text-sm text-gray-700">{order.customer_address}</td>
                        <td className="border-b px-4 py-3 text-sm text-gray-700">{order.customer_email}</td>
                        <td className="border-b px-4 py-3 text-sm text-gray-700">${order.total_amount}</td>
                        <td className="border-b px-4 py-3 text-sm text-gray-700">{order.status}</td>
                        <td className="border-b px-4 py-3 text-sm text-gray-700">{new Date(order.order_date).toLocaleDateString()}</td>
                    </tr>
                    ))}
                </tbody>
        </table>
    </div>
    )                                                                               ;
}

export default OrdersTable                                                          ;