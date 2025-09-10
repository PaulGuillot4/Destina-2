"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Loader2 } from "lucide-react"
import { useState } from "react"
import { ChatInterface } from "@/components/chat-interface"

export function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showChat, setShowChat] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    // Simular búsqueda - aquí conectarías con tu API de Django
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsLoading(false)

    // Mostrar el chat en la misma página
    setShowChat(true)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <section className="relative bg-gradient-to-br from-rose-50 to-pink-50 py-20 transition-all duration-700 ease-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Se desvanece suavemente cuando aparece el chat */}
        <div
          className={`text-center mb-12 transition-all duration-700 ease-out ${
            showChat ? "opacity-60 scale-95 transform -translate-y-4" : "opacity-100 scale-100 transform translate-y-0"
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Encuentra tu destino perfecto</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre alojamientos únicos y vive experiencias inolvidables en cualquier lugar del mundo
          </p>
        </div>

        {/* Search Bar */}
        <div
          className={`max-w-2xl mx-auto transition-all duration-700 ease-out ${
            showChat ? "scale-95 opacity-90" : "scale-100 opacity-100"
          }`}
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-2 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-2">
              <div className="flex-1 flex items-center space-x-3 px-6 py-4">
                <Search className="h-5 w-5 text-gray-400" />
                <Input
                  placeholder="¿A dónde quieres ir? Busca destinos, ciudades, países..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="border-0 p-0 text-lg placeholder:text-gray-500 focus-visible:ring-0 bg-transparent"
                  disabled={isLoading}
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={isLoading || !searchQuery.trim()}
                size="lg"
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-xl px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Buscando...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Buscar
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Loading animation overlay */}
          {isLoading && (
            <div className="mt-8 text-center animate-in fade-in duration-500">
              <div className="inline-flex items-center space-x-3 text-rose-500 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                <div className="relative">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <div className="absolute inset-0 h-6 w-6 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 opacity-20 animate-pulse"></div>
                </div>
                <span className="text-lg font-medium">Conectando con el asistente...</span>
              </div>
            </div>
          )}
        </div>

        {/* Popular searches - Solo mostrar si no hay chat activo */}
        <div
          className={`max-w-2xl mx-auto mt-8 text-center transition-all duration-700 ease-out ${
            showChat ? "opacity-0 transform translate-y-4 pointer-events-none" : "opacity-100 transform translate-y-0"
          }`}
        >
          <p className="text-sm text-gray-600 mb-4">Búsquedas populares:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Barcelona", "París", "Tokyo", "Nueva York", "Bali", "Roma"].map((city) => (
              <Button
                key={city}
                variant="outline"
                size="sm"
                className="rounded-full bg-white/60 backdrop-blur-sm border-white/30 hover:bg-white/80 hover:scale-105 transition-all duration-300"
                onClick={() => {
                  setSearchQuery(city)
                }}
                disabled={isLoading}
              >
                {city}
              </Button>
            ))}
          </div>
        </div>

        {/* Chat Interface - Se despliega en la misma página */}
        <div
          className={`max-w-4xl mx-auto mt-12 transition-all duration-700 ease-out ${
            showChat
              ? "opacity-100 transform translate-y-0 scale-100"
              : "opacity-0 transform translate-y-8 scale-95 pointer-events-none"
          }`}
        >
          {showChat && (
            <ChatInterface
              initialQuery={searchQuery}
              onClose={() => setShowChat(false)}
              onNewSearch={(query) => {
                setSearchQuery(query)
                setShowChat(false)
              }}
            />
          )}
        </div>
      </div>
    </section>
  )
}
