interface PageLayoutProps {
  children: React.ReactNode
}

const PageLayout = ({ children }: PageLayoutProps) => (
  <>
    <div className="h-full overflow-auto px-8 py-4">{children}</div>
  </>
)

export default PageLayout
