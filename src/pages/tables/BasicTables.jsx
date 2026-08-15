import { PageHeader } from '../../components/common/PageHeader';
import { StatusChip } from '../../components/common/StatusChip';
import { useAppData } from '../../contexts/AppDataContext';
import { formatCurrency } from '../../utils/format';

export function BasicTables() {
  const { products, customers } = useAppData();

  return (
    <div className="c-page p-tables">
      <PageHeader
        title="Tables"
        crumbs={[{ label: 'Forms & Tables' }, { label: 'Tables' }]}
      />

      <div className="c-stack">
        <section className="c-table-card">
          <header className="c-table-card__head">
            <h2>Products</h2>
            <p>Catalog snapshot with pricing and stock</p>
          </header>
          <div className="c-table-wrap">
            <table className="c-table">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">SKU</th>
                  <th scope="col" className="is-right">
                    Price
                  </th>
                  <th scope="col" className="is-right">
                    Stock
                  </th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 6).map((product) => (
                  <tr key={product.id}>
                    <td>
                      <span className="c-table__primary">{product.name}</span>
                    </td>
                    <td>
                      <span className="c-table__mono">{product.sku}</span>
                    </td>
                    <td className="is-right">{formatCurrency(product.price)}</td>
                    <td className="is-right">{product.stock}</td>
                    <td>
                      <StatusChip value={product.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="c-table-card">
          <header className="c-table-card__head">
            <h2>Customers</h2>
            <p>Compact customer spend overview</p>
          </header>
          <div className="c-table-wrap">
            <table className="c-table is-compact">
              <thead>
                <tr>
                  <th scope="col">Customer</th>
                  <th scope="col">Phone</th>
                  <th scope="col">City</th>
                  <th scope="col" className="is-right">
                    Spent
                  </th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {customers.slice(0, 6).map((customer) => (
                  <tr key={customer.id}>
                    <td>
                      <span className="c-table__primary">{customer.name}</span>
                    </td>
                    <td>{customer.phone}</td>
                    <td>{customer.city}</td>
                    <td className="is-right">{formatCurrency(customer.totalSpent)}</td>
                    <td>
                      <StatusChip value={customer.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
