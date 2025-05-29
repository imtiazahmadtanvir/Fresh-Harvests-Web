"use client"

import type React from "react"
import { useEffect, useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Send, AlertCircle, Loader2, Computer, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { MessageModal } from "./message-modal"

interface Message {
  text: string
  role: "user" | "model"
  timestamp: Date
}

interface PredefinedQuestion {
  question: string
  answer: string
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState("")
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [screenSize, setScreenSize] = useState<"small" | "medium" | "large">("medium")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Define predefined questions and answers
  const predefinedQuestions: PredefinedQuestion[] = [
   {
      question: "What is Fresh Harvest?",
      answer:
        "Fresh Harvest is your premier destination for high-quality and fresh produce. We are passionate about providing you with the finest fruits, vegetables, and salad ingredients to nourish your body and delight your taste buds. With a commitment to excellence, sustainability, and customer satisfaction, Fresh Harvest is here to revolutionize your grocery shopping experience.",
    },
    {
      question: "What products do you offer?",
      answer:
        "We offer a wide variety of fresh produce including seasonal fruits (bananas, coconuts, guavas, pomegranates, kiwis), fresh vegetables (mushrooms, cauliflower, mustard greens), premium salads, and organic seafood. All our products are carefully selected for quality and freshness.",
    },
    {
      question: "Do you offer delivery services?",
      answer:
        "Yes! We offer fast and reliable delivery services. We provide same-day delivery for orders placed before 2 PM, and free delivery on orders over $50. You can also download our mobile app from the App Store or Google Play for convenient ordering and tracking.",
    },
    {
      question: "Are your products organic?",
      answer:
        "Yes, we are committed to providing 100% organic and sustainably sourced produce. All our fruits and vegetables are certified organic, hand-picked for premium quality, and we guarantee freshness with every order. We work directly with local farmers to ensure the highest standards.",
    },
    {
      question: "How can I place an order?",
      answer:
        "You can place orders through our website, mobile app, or visit our physical store. Simply browse our products, add items to your cart, and proceed to checkout. We accept various payment methods including Visa, PayPal, and Apple Pay. You can also add items to your favorites for quick reordering.",
    },
    {
      question: "What are your current offers?",
      answer:
        "We currently have amazing deals including up to 70% off on our seasonal fruit bundles with code FRESH25, and special discounts on fresh salads. Check our promotions section for limited-time offers and seasonal discounts. New customers get 15% off their first order!",
    },
  ]

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 640) {
        setScreenSize("small")
      } else if (window.innerWidth < 1024) {
        setScreenSize("medium")
      } else {
        setScreenSize("large")
      }
    }

    // Initial check
    checkScreenSize()

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize)

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Initialize chat session
  useEffect(() => {
    let isMounted = true

    const initChat = async () => {
      if (!isMounted) return

      setIsLoading(true)
      try {
        // Simulate API call for demo purposes
        setTimeout(() => {
          if (isMounted) {
            setSessionId("demo-session-id")
            setIsLoading(false)
          }
        }, 1000)
      } catch (err: any) {
        if (isMounted) {
          setError("Failed to initialize chat: " + err.message)
          setIsLoading(false)
        }
      }
    }

    initChat()

    // Focus the input field when the component mounts
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)

    return () => {
      isMounted = false
    }
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Function to handle predefined questions directly
  const handlePredefinedQuestion = useCallback(
    (question: string) => {
      // Find the matching predefined question
      const predefinedQuestion = predefinedQuestions.find((item) => item.question.trim() === question.trim())

      if (!predefinedQuestion) return false

      // Add user message
      const userMessage: Message = {
        text: question,
        role: "user",
        timestamp: new Date(),
      }

      setMessages((prevMessages) => [...prevMessages, userMessage])
      setUserInput("")

      // Show loading indicator
      setIsLoading(true)

      // Add a small delay to simulate processing
      setTimeout(() => {
        // Add bot response with predefined answer
        const botMessage: Message = {
          text: predefinedQuestion.answer,
          role: "model",
          timestamp: new Date(),
        }

        setMessages((prevMessages) => [...prevMessages, botMessage])
        setIsLoading(false)
        setShowSuggestions(true)

        // Scroll to bottom
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)
      }, 800)

      return true
    },
    [predefinedQuestions],
  )

  const handleSendMessage = useCallback(
    async (input?: string) => {
      const messageToSend = input || userInput
      if (!messageToSend.trim() || !sessionId) return

      // Hide suggestions when sending a message
      setShowSuggestions(false)

      // Check if it's a predefined question first
      // If it is, handle it and return early
      const isPredefined = handlePredefinedQuestion(messageToSend)
      if (isPredefined) return

      // If not a predefined question, proceed with normal flow
      const userMessage: Message = {
        text: messageToSend,
        role: "user",
        timestamp: new Date(),
      }

      setMessages((prevMessages) => [...prevMessages, userMessage])
      setUserInput("")

      // For non-predefined questions, simulate API response
      setIsLoading(true)

      // Simulate API call for demo purposes
      setTimeout(() => {
        const botMessage: Message = {
          text: `Thank you for your message: "${messageToSend}". This is a demo response since we're not connected to a real API in this preview.`,
          role: "model",
          timestamp: new Date(),
        }

        setMessages((prevMessages) => [...prevMessages, botMessage])
        setIsLoading(false)
        setShowSuggestions(true)

        // Focus the input field after sending a message
        setTimeout(() => {
          inputRef.current?.focus()
          // Scroll to the bottom after a short delay to ensure the DOM has updated
          setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
          }, 100)
        }, 100)
      }, 1000)
    },
    [sessionId, userInput, handlePredefinedQuestion],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSendMessage()
      }
    },
    [handleSendMessage],
  )

  const handlePredefinedQuestionClick = useCallback(
    (question: string) => {
      handlePredefinedQuestion(question)
    },
    [handlePredefinedQuestion],
  )

  const handleMessageClick = useCallback((message: Message) => {
    setSelectedMessage(message)
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  // Filter out the questions that have already been asked
  const getUnaskedQuestions = useCallback(() => {
    const askedQuestions = messages.filter((msg) => msg.role === "user").map((msg) => msg.text)
    return predefinedQuestions.filter((item) => !askedQuestions.includes(item.question))
  }, [messages, predefinedQuestions])

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Fixed Header */}
      <div className="bg-green-700 text-white py-2 px-3 sm:py-3 sm:px-6 md:py-4 md:px-8 border-b border-green-800 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl md:text-3xl mx-auto font-bold text-center flex items-center gap-1 sm:gap-2 md:gap-3">
            <Computer className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
            Fresh Harvest Assistant
          </h2>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-grow overflow-hidden relative">
        {error && (
          <Alert variant="destructive" className="m-2 sm:m-4 md:m-7">
            <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6" />
            <AlertDescription className="text-sm sm:text-base md:text-lg">{error}</AlertDescription>
          </Alert>
        )}

        <div className="h-full overflow-y-auto bg-green-50 pb-4">
          <div className="p-3 sm:p-4 md:p-6 lg:p-8">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-3 sm:p-6 md:p-8 lg:p-10">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium mb-1 sm:mb-2 md:mb-3 text-green-800">
                  Welcome to Fresh Harvests Assistant
                </h3>
                <div className="mt-3 sm:mt-4 md:mt-6 lg:mt-8 space-y-2 md:space-y-3 w-full max-w-2xl">
                  {predefinedQuestions.map((item, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => handlePredefinedQuestionClick(item.question)}
                      className="bg-green-100 hover:bg-green-200 text-green-800 border-green-300 w-full text-left justify-start text-xs sm:text-sm md:text-base lg:text-lg py-2 px-3 md:py-3 md:px-4 h-auto min-h-[40px] md:min-h-[50px]"
                    >
                      {item.question}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4 md:space-y-5 w-full max-w-4xl mx-auto">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex flex-col rounded-lg cursor-pointer transition-all hover:opacity-90 hover:shadow-md",
                      "p-3 sm:p-4 md:p-5",
                      msg.role === "user" ? "ml-auto bg-green-600 text-white" : "mr-auto bg-green-100 text-green-900",
                      "max-w-[85%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-[70%]",
                    )}
                    onClick={() => handleMessageClick(msg)}
                  >
                    <div className="whitespace-pre-wrap text-sm sm:text-base md:text-lg">
                      {msg.text.length > 150 ? `${msg.text.substring(0, 150)}...` : msg.text}
                    </div>
                    <div className="flex items-center justify-between mt-1 sm:mt-2 md:mt-3">
                      <span
                        className={cn(
                          "text-[10px] sm:text-xs md:text-sm",
                          msg.role === "user" ? "text-green-100" : "text-green-700",
                        )}
                      >
                        {msg.role === "model" && (
                          <GraduationCap className="h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4 inline mr-1" />
                        )}
                        Click to expand
                      </span>
                      <span
                        className={cn(
                          "text-[10px] sm:text-xs md:text-sm",
                          msg.role === "user" ? "text-green-100" : "text-green-700",
                        )}
                      >
                        {format(msg.timestamp, "h:mm a")}
                      </span>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex flex-col max-w-[85%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-[70%] rounded-lg p-3 sm:p-4 md:p-5 mr-auto bg-green-100 text-green-900">
                    <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                      <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 animate-spin" />
                      <span className="text-sm sm:text-base md:text-lg">Thinking...</span>
                    </div>
                  </div>
                )}

                {/* Show remaining questions after each bot response */}
                {showSuggestions && messages.length > 0 && messages[messages.length - 1].role === "model" && (
                  <div className="my-3 sm:my-4 md:my-5 p-2 sm:p-3 md:p-4 bg-green-50 border border-green-200 rounded-lg max-w-4xl mx-auto">
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-green-800 mb-1 sm:mb-2 md:mb-3">
                      You might also want to ask:
                    </p>
                    <div className="space-y-1.5 sm:space-y-2 md:space-y-3 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                      {getUnaskedQuestions()
                        .slice(0, 4)
                        .map((item, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handlePredefinedQuestionClick(item.question)}
                            className="bg-white hover:bg-green-100 text-green-800 border-green-200 w-full text-left justify-start text-xs sm:text-sm md:text-base py-1.5 px-2 md:py-2 md:px-3 h-auto min-h-[32px] md:min-h-[40px]"
                          >
                            {item.question}
                          </Button>
                        ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fixed Input Area */}
      <div className="p-2 sm:p-3 md:p-4 lg:p-6 border-t border-green-200 bg-green-50 flex-shrink-0">
        <div className="flex gap-1 sm:gap-2 md:gap-3 max-w-4xl mx-auto">
          <Input
            ref={inputRef}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask something about you want to know..."
            disabled={isLoading || !sessionId}
            className="flex-1 border-green-300 focus-visible:ring-green-500 text-sm sm:text-base md:text-lg h-9 sm:h-10 md:h-12"
          />
          <Button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !userInput.trim() || !sessionId}
            size="icon"
            className="bg-green-700 hover:bg-green-800 h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12"
          >
            {isLoading ? (
              <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 animate-spin" />
            ) : (
              <Send className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Custom Modal */}
      <MessageModal isOpen={isModalOpen} onClose={closeModal} message={selectedMessage} screenSize={screenSize} />
    </div>
  )
}
