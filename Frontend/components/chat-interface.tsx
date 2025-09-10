"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { X, Send, User, RotateCcw, Sparkles } from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  isTyping?: boolean
}

interface ChatInterfaceProps {
  initialQuery: string
  onClose: () => void
  onNewSearch: (query: string) => void
}

export function ChatInterface({ initialQuery, onClose, onNewSearch }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentMessage, setCurrentMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [hasScrolledToChat, setHasScrolledToChat] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToChatOnce = () => {
    if (!hasScrolledToChat && chatContainerRef.current) {
      // Scroll suave hacia el chat container
      chatContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
      setHasScrolledToChat(true)
    }
  }

  // Solo hacer scroll dentro del área de mensajes cuando se agregan nuevos mensajes
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom()
    }
  }, [messages, isTyping])

  useEffect(() => {
    // Agregar mensaje inicial del usuario con animación
    if (initialQuery) {
      // Scroll hacia el chat una sola vez cuando aparece
      setTimeout(() => {
        scrollToChatOnce()
      }, 100)

      setTimeout(() => {
        const userMessage: Message = {
          id: Date.now().toString(),
          type: "user",
          content: initialQuery,
          timestamp: new Date(),
        }
        setMessages([userMessage])

        // Simular que la IA está escribiendo
        setTimeout(() => {
          setIsTyping(true)

          // Mensaje de bienvenida de la IA después de "escribir"
          setTimeout(() => {
            setIsTyping(false)
            const welcomeMessage: Message = {
              id: (Date.now() + 1).toString(),
              type: "ai",
              content: `¡Hola! He recibido tu consulta sobre "${initialQuery}". Por el momento estoy en desarrollo, pero pronto podré ayudarte a encontrar el alojamiento perfecto. ¡Mantente atento a las actualizaciones!`,
              timestamp: new Date(),
            }
            setMessages((prev) => [...prev, welcomeMessage])
          }, 2000)
        }, 800)
      }, 300)
    }
  }, [initialQuery])

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: currentMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setCurrentMessage("")

    // Simular que la IA está escribiendo
    setTimeout(() => {
      setIsTyping(true)

      // Respuesta automática placeholder después de "escribir"
      setTimeout(() => {
        setIsTyping(false)
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content:
            "Gracias por tu mensaje. Estoy en desarrollo y pronto podré procesar tus consultas de manera inteligente. ¡Espera próximas actualizaciones!",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiResponse])
      }, 1500)
    }, 500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div ref={chatContainerRef}>
      <Card className="w-full shadow-2xl border-0 bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden animate-in slide-in-from-bottom-4 duration-700">
        {/* Header */}
        <CardHeader className="border-b border-gray-100/50 bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl shadow-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 flex items-center">
                  Asistente de Destina
                  <span className="ml-2 text-xs bg-gradient-to-r from-rose-500 to-pink-500 text-white px-2 py-1 rounded-full">
                    Beta
                  </span>
                </h3>
                <p className="text-sm text-gray-600">Próximamente con IA avanzada</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNewSearch("")}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-xl transition-all duration-200"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Nueva búsqueda
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-gray-100/50 rounded-xl transition-all duration-200"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Messages */}
        <CardContent className="p-0">
          <div className="h-96 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-50/30 to-white/50">
            {messages.length === 0 && !isTyping && (
              <div className="text-center text-gray-500 mt-12 animate-in fade-in duration-1000">
                <div className="relative inline-block">
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-rose-500" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white animate-bounce"></div>
                </div>
                <p className="text-lg font-medium text-gray-700">¡Hola! Soy tu asistente de viajes</p>
                <p className="text-sm text-gray-500 mt-1">Escribe algo para comenzar...</p>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-500`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`flex space-x-3 max-w-[85%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                >
                  <Avatar className="w-10 h-10 flex-shrink-0 shadow-lg">
                    <AvatarFallback
                      className={
                        message.type === "user"
                          ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                          : "bg-gradient-to-br from-rose-500 to-pink-500 text-white"
                      }
                    >
                      {message.type === "user" ? <User className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <div
                      className={`px-4 py-3 rounded-2xl shadow-sm ${
                        message.type === "user"
                          ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-md"
                          : "bg-white/90 backdrop-blur-sm text-gray-800 border border-gray-100/50 rounded-bl-md shadow-lg"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    <p
                      className={`text-xs px-2 ${message.type === "user" ? "text-blue-200 text-right" : "text-gray-400"}`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
                <div className="flex space-x-3 max-w-[85%]">
                  <Avatar className="w-10 h-10 flex-shrink-0 shadow-lg">
                    <AvatarFallback className="bg-gradient-to-br from-rose-500 to-pink-500 text-white">
                      <Sparkles className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-white/90 backdrop-blur-sm border border-gray-100/50 rounded-2xl rounded-bl-md shadow-lg px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-100/50 bg-white/90 backdrop-blur-xl p-4">
            <div className="flex space-x-3">
              <Input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                className="flex-1 border-gray-200/50 bg-gray-50/50 rounded-xl focus:bg-white/80 transition-all duration-200"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!currentMessage.trim() || isTyping}
                size="icon"
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Presiona Enter para enviar • Próximamente con IA inteligente ✨
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
