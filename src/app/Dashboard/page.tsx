import { Footer } from "../component/footer"
import { Header } from "../component/header"
import { MainContent } from "../component/main-content"
import { Sidebar } from "../component/sidebar"

export default function Home() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6 flex items-center justify-center">
          <MainContent />
        </main>
        <Footer />
      </div>
    </div>
  )
}

