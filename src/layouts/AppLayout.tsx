import ToolBar from 'components/ToolBar'
import PageLayout from 'layouts/PageLayout'

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => (
  <div className="flex min-h-screen flex-col">
    <main className="flex-1">
      <PageLayout>{children}</PageLayout>
    </main>
    <ToolBar />
  </div>
)

export default AppLayout
