import { Navigate, Route, Routes } from 'react-router-dom';
import { TemplateCustomizer } from './components/customizer/TemplateCustomizer';
import { GuestRoute, ProtectedRoute, RoleGuard } from './components/common/ProtectedRoute';
import { AuthLayout } from './layouts/AuthLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { FrontLayout } from './layouts/FrontLayout';
import { LandingPage } from './pages/front/LandingPage';
import { PricingPage } from './pages/front/PricingPage';
import { PaymentPage } from './pages/front/PaymentPage';
import { CheckoutPage } from './pages/front/CheckoutPage';
import { HelpPage } from './pages/front/HelpPage';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
import { Dashboard } from './pages/dashboard/Dashboard';
import { CrmDashboard } from './pages/dashboard/CrmDashboard';
import { EcommerceDashboard } from './pages/dashboard/EcommerceDashboard';
import { AnalyticsDashboard } from './pages/dashboard/AnalyticsDashboard';
import { UsersList } from './pages/users/UsersList';
import { UserForm } from './pages/users/UserForm';
import { UserDetails } from './pages/users/UserDetails';
import { CustomersList } from './pages/customers/CustomersList';
import { CustomerDetails } from './pages/customers/CustomerDetails';
import { CustomerForm } from './pages/customers/CustomerForm';
import { ProductsList } from './pages/products/ProductsList';
import { ProductForm } from './pages/products/ProductForm';
import { ProductDetails } from './pages/products/ProductDetails';
import { Categories } from './pages/products/Categories';
import { OrdersList } from './pages/orders/OrdersList';
import { OrderDetails } from './pages/orders/OrderDetails';
import { RolesList } from './pages/access/RolesList';
import { RoleForm } from './pages/access/RoleForm';
import { PermissionMatrix } from './pages/access/PermissionMatrix';
import { Reports } from './pages/reports/Reports';
import { NotificationsPage } from './pages/notifications/NotificationsPage';
import { Settings } from './pages/settings/Settings';
import { FormElements } from './pages/forms/FormElements';
import { FormLayouts } from './pages/forms/FormLayouts';
import { FormWizard } from './pages/forms/FormWizard';
import { FormValidation } from './pages/forms/FormValidation';
import { BasicTables } from './pages/tables/BasicTables';
import { DataTablesDemo } from './pages/tables/DataTablesDemo';
import { FaqPage } from './pages/faq/FaqPage';
import { TabsPage } from './pages/tabs/TabsPage';
import { ChatPage } from './pages/chat/ChatPage';
import { IconsPage } from './pages/icons/IconsPage';
import { PopupsPage } from './pages/popups/PopupsPage';
import { ComponentsPage } from './pages/components/ComponentsPage';
import {
  ForbiddenPage,
  NotFoundPage,
  ServerErrorPage,
  SystemEmptyPage,
  SystemErrorPage,
  SystemForbiddenPage,
  SystemLoadingPage,
  SystemNotFoundPage,
  SystemServerErrorPage,
} from './pages/system/SystemPages';

export default function App() {
  return (
    <>
    <Routes>
      <Route element={<FrontLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/front" element={<Navigate to="/" replace />} />
        <Route path="/front/landing" element={<Navigate to="/" replace />} />
        <Route path="/front/pricing" element={<PricingPage />} />
        <Route path="/front/payment" element={<PaymentPage />} />
        <Route path="/front/checkout" element={<CheckoutPage />} />
        <Route path="/front/help" element={<HelpPage />} />
      </Route>

      <Route element={<GuestRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route element={<RoleGuard permission="dashboard.view" />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/crm" element={<CrmDashboard />} />
            <Route path="/dashboard/ecommerce" element={<EcommerceDashboard />} />
            <Route path="/dashboard/analytics" element={<AnalyticsDashboard />} />
          </Route>

          <Route element={<RoleGuard permission="users.create" />}>
            <Route path="/users/new" element={<UserForm />} />
          </Route>
          <Route element={<RoleGuard permission="users.edit" />}>
            <Route path="/users/:id/edit" element={<UserForm />} />
          </Route>
          <Route element={<RoleGuard permission="users.view" />}>
            <Route path="/users" element={<UsersList />} />
            <Route path="/users/:id" element={<UserDetails />} />
          </Route>

          <Route element={<RoleGuard permission="customers.edit" />}>
            <Route path="/customers/new" element={<CustomerForm />} />
            <Route path="/customers/:id/edit" element={<CustomerForm />} />
          </Route>
          <Route element={<RoleGuard permission="customers.view" />}>
            <Route path="/customers" element={<CustomersList />} />
            <Route path="/customers/:id" element={<CustomerDetails />} />
          </Route>

          <Route element={<RoleGuard permission="products.create" />}>
            <Route path="/products/new" element={<ProductForm />} />
          </Route>
          <Route element={<RoleGuard permission="products.edit" />}>
            <Route path="/products/:id/edit" element={<ProductForm />} />
          </Route>
          <Route element={<RoleGuard permission="products.view" />}>
            <Route path="/products" element={<ProductsList />} />
            <Route path="/products/categories" element={<Categories />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Route>

          <Route element={<RoleGuard permission="orders.view" />}>
            <Route path="/orders" element={<OrdersList />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
          </Route>

          <Route element={<RoleGuard permission="roles.view" />}>
            <Route path="/access/roles" element={<RolesList />} />
            <Route path="/access/permissions" element={<PermissionMatrix />} />
          </Route>
          <Route element={<RoleGuard permission="roles.edit" />}>
            <Route path="/access/roles/new" element={<RoleForm />} />
            <Route path="/access/roles/:id/edit" element={<RoleForm />} />
          </Route>

          <Route element={<RoleGuard permission="reports.view" />}>
            <Route path="/reports" element={<Navigate to="/reports/sales" replace />} />
            <Route path="/reports/:type" element={<Reports />} />
          </Route>

          <Route element={<RoleGuard permission="notifications.view" />}>
            <Route path="/notifications" element={<NotificationsPage />} />
          </Route>

          <Route path="/forms/elements" element={<Navigate to="/forms/elements/text" replace />} />
          <Route path="/forms/elements/:type" element={<FormElements />} />
          <Route path="/forms/layouts" element={<Navigate to="/forms/layouts/vertical" replace />} />
          <Route path="/forms/layouts/:type" element={<FormLayouts />} />
          <Route path="/forms/wizard" element={<Navigate to="/forms/wizard/numbered" replace />} />
          <Route path="/forms/wizard/:type" element={<FormWizard />} />
          <Route path="/forms/validation" element={<FormValidation />} />
          <Route path="/tables/basic" element={<BasicTables />} />
          <Route path="/tables/data" element={<Navigate to="/tables/data/basic" replace />} />
          <Route path="/tables/data/:type" element={<DataTablesDemo />} />
          <Route path="/pages/faq" element={<Navigate to="/pages/faq/basic" replace />} />
          <Route path="/pages/faq/:type" element={<FaqPage />} />
          <Route path="/pages/tabs" element={<Navigate to="/pages/tabs/basic" replace />} />
          <Route path="/pages/tabs/:type" element={<TabsPage />} />
          <Route path="/pages/icons" element={<Navigate to="/pages/icons/gallery" replace />} />
          <Route path="/pages/icons/:type" element={<IconsPage />} />
          <Route path="/pages/components" element={<Navigate to="/pages/components/buttons" replace />} />
          <Route path="/pages/components/:type" element={<ComponentsPage />} />
          <Route path="/pages/popups" element={<PopupsPage />} />
          <Route path="/apps/chat" element={<ChatPage />} />

          <Route element={<RoleGuard permission="settings.view" />}>
            <Route path="/settings" element={<Navigate to="/settings/profile" replace />} />
            <Route path="/settings/:section" element={<Settings />} />
          </Route>

          <Route path="/system/404" element={<SystemNotFoundPage />} />
          <Route path="/system/403" element={<SystemForbiddenPage />} />
          <Route path="/system/500" element={<SystemServerErrorPage />} />
          <Route path="/system/loading" element={<SystemLoadingPage />} />
          <Route path="/system/empty" element={<SystemEmptyPage />} />
          <Route path="/system/error" element={<SystemErrorPage />} />

          <Route path="/403" element={<ForbiddenPage />} />
          <Route path="/500" element={<ServerErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
    <TemplateCustomizer />
    </>
  );
}
