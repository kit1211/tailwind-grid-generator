"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Download, Eye, Code, Palette, Grid, Settings } from "lucide-react"
import hljs from "highlight.js/lib/core"
import javascript from "highlight.js/lib/languages/javascript"
import xml from "highlight.js/lib/languages/xml"
import "highlight.js/styles/github-dark.css"

hljs.registerLanguage("javascript", javascript)
hljs.registerLanguage("typescript", javascript)
hljs.registerLanguage("html", xml)
hljs.registerLanguage("xml", xml)

import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"

import { Textarea } from "@/components/ui/textarea"

interface GridConfig {
  cols: {
    sm: number
    md: number
    lg: number
    xl: number
  }
  rows: number
  gap: number
  gapX: number
  gapY: number
  items: number
  mockData: string[]
}

interface ContainerConfig {
  alignment: "left" | "center" | "right"
}

interface StepConfig {
  mobile: number
  tablet: number
  desktop: number
}

const frameworks = [
  { id: "nextjs", name: "Next.js", extension: "tsx" },
  { id: "nuxt", name: "Nuxt.js", extension: "vue" },
  { id: "html", name: "HTML", extension: "html" },
  { id: "react", name: "React", extension: "jsx" },
  { id: "vue", name: "Vue.js", extension: "vue" },
]

const defaultMockData = [
  "Product Card",
  "Service Item",
  "Blog Post",
  "Team Member",
  "Portfolio Item",
  "Feature Box",
  "Testimonial",
  "Gallery Image",
  "News Article",
  "Course Card",
  "Event Item",
  "Project Card",
]

const mockDataTemplates = {
  ecommerce: [
    "iPhone 15 Pro",
    "MacBook Air M2",
    "AirPods Pro",
    "iPad Pro 12.9",
    "Apple Watch Ultra",
    "Magic Keyboard",
    "Studio Display",
    "Mac Studio",
    "HomePod mini",
    "Apple TV 4K",
    "MagSafe Charger",
    "Lightning Cable",
  ],
  portfolio: [
    "Web Design Project",
    "Mobile App UI",
    "Brand Identity",
    "Photography Work",
    "Illustration Set",
    "Logo Design",
    "Print Design",
    "3D Modeling",
    "Animation Project",
    "UX Case Study",
    "Art Direction",
    "Creative Campaign",
  ],
  blog: [
    "Getting Started with React",
    "CSS Grid vs Flexbox",
    "JavaScript ES6 Features",
    "Web Performance Tips",
    "Design System Guide",
    "Mobile-First Design",
    "API Integration Best Practices",
    "Testing Strategies",
    "Deployment Workflows",
    "Security Best Practices",
    "Accessibility Guidelines",
    "SEO Optimization",
  ],
  team: [
    "John Smith - CEO",
    "Sarah Johnson - CTO",
    "Mike Chen - Designer",
    "Emily Davis - Developer",
    "Alex Rodriguez - Marketing",
    "Lisa Wang - Product Manager",
    "David Brown - Sales",
    "Anna Kim - HR Manager",
    "Tom Wilson - DevOps",
    "Maria Garcia - QA Lead",
    "Chris Lee - Data Analyst",
    "Jessica Taylor - Content Writer",
  ],
  services: [
    "Web Development",
    "Mobile App Design",
    "Digital Marketing",
    "SEO Optimization",
    "Brand Strategy",
    "Content Creation",
    "Social Media Management",
    "E-commerce Solutions",
    "Cloud Services",
    "Data Analytics",
    "Cybersecurity",
    "Consulting Services",
  ],
  features: [
    "Fast Performance",
    "Secure & Reliable",
    "Mobile Responsive",
    "24/7 Support",
    "Easy Integration",
    "Scalable Architecture",
    "Real-time Updates",
    "Advanced Analytics",
    "Custom Branding",
    "API Access",
    "Multi-language",
    "Cloud Storage",
  ],
}

const highlightCode = (code: string, framework: string) => {
  const language =
    frameworks.find((fw) => fw.id === framework)?.extension === "tsx"
      ? "typescript"
      : frameworks.find((fw) => fw.id === framework)?.extension === "vue"
        ? "javascript"
        : "html"

  try {
    return hljs.highlight(code, { language }).value
  } catch (error) {
    // Fallback to plain text if highlighting fails
    return hljs.highlightAuto(code).value
  }
}

export default function TailwindGridGenerator() {
  const [config, setConfig] = useState<GridConfig>({
    cols: { sm: 2, md: 3, lg: 4, xl: 6 },
    rows: 0,
    gap: 4,
    gapX: 4,
    gapY: 4,
    items: 6,
    mockData: [...defaultMockData.slice(0, 6)],
  })
  const [framework, setFramework] = useState("nextjs")
  const [previewMode, setPreviewMode] = useState<"sm" | "md" | "lg" | "xl">("lg")
  const [containerAlignment, setContainerAlignment] = useState<"left" | "center" | "right">("center")
  const [showGridLines, setShowGridLines] = useState(true)
  const [theme, setTheme] = useState("light")
  const [zoom, setZoom] = useState(100)
  const [mockDataType, setMockDataType] = useState("default")
  const [customMockData, setCustomMockData] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [previewWidth, setPreviewWidth] = useState(640)
  const [displayableWidth, setDisplayableWidth] = useState(640)

  const updateConfig = useCallback((key: keyof GridConfig, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }, [])

  const updateCols = useCallback((breakpoint: keyof GridConfig["cols"], value: number) => {
    setConfig((prev) => ({
      ...prev,
      cols: { ...prev.cols, [breakpoint]: value },
    }))
  }, [])

  const updateStepConfig = useCallback((device: keyof StepConfig, value: number) => {
    // setStepConfig((prev) => ({ ...prev, [device]: value }))
  }, [])

  const applyStepConfig = useCallback(() => {
    // setConfig((prev) => ({
    //   ...prev,
    //   cols: {
    //     sm: stepConfig.mobile,
    //     md: stepConfig.tablet,
    //     lg: stepConfig.desktop,
    //     xl: stepConfig.desktop,
    //   },
    // }))
  }, [])

  const updateMockData = useCallback((index: number, value: string) => {
    setConfig((prev) => ({
      ...prev,
      mockData: prev.mockData.map((item, i) => (i === index ? value : item)),
    }))
  }, [])

  const addMockItem = useCallback(() => {
    setConfig((prev) => ({
      ...prev,
      items: prev.items + 1,
      mockData: [...prev.mockData, `Item ${prev.items + 1}`],
    }))
  }, [])

  const removeMockItem = useCallback(() => {
    if (config.items > 1) {
      setConfig((prev) => ({
        ...prev,
        items: prev.items - 1,
        mockData: prev.mockData.slice(0, -1),
      }))
    }
  }, [config.items])

  const applyMockTemplate = useCallback(
    (templateKey: keyof typeof mockDataTemplates) => {
      const templateData = mockDataTemplates[templateKey]
      const itemsToUse = Math.min(config.items, templateData.length)

      setConfig((prev) => ({
        ...prev,
        mockData: templateData
          .slice(0, itemsToUse)
          .concat(Array.from({ length: Math.max(0, prev.items - itemsToUse) }, (_, i) => `Item ${itemsToUse + i + 1}`)),
      }))

      setAlertMessage(`use ${templateKey} template`)
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 3000)
    },
    [config.items],
  )

  const generateRandomMockData = useCallback(() => {
    const allTemplates = Object.values(mockDataTemplates).flat()
    const shuffled = allTemplates.sort(() => 0.5 - Math.random())

    setConfig((prev) => ({
      ...prev,
      mockData: shuffled.slice(0, prev.items),
    }))

    setAlertMessage("generate random mock data")
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
    }, 3000)
  }, [])

  const generateGridClasses = useCallback(() => {
    const currentCols = config.cols[previewMode]
    return `grid grid-cols-${currentCols} gap-${config.gap}`
  }, [config.cols, config.gap, previewMode])

  const getPreviewContainerWidth = useCallback(() => {
    switch (previewMode) {
      case "sm":
        return "max-w-sm" // Keep SM container small to show 2 columns properly
      case "md":
        return "max-w-2xl"
      case "lg":
        return "max-w-4xl"
      case "xl":
        return "max-w-6xl"
      default:
        return "max-w-4xl"
    }
  }, [previewMode])

  const getContainerAlignmentClasses = useCallback(() => {
    const alignmentClasses = {
      left: "mr-auto",
      center: "mx-auto",
      right: "ml-auto",
    }

    return alignmentClasses[containerAlignment]
  }, [containerAlignment])

  const generateCode = useCallback(() => {
    const containerClasses = `${getPreviewContainerWidth()} ${getContainerAlignmentClasses()}`
    const gridClasses = `grid grid-cols-${config.cols.sm} md:grid-cols-${config.cols.md} lg:grid-cols-${config.cols.lg} xl:grid-cols-${config.cols.xl} gap-${config.gap}`

    switch (framework) {
      case "nextjs":
      case "react":
        return `// Updated container classes to include alignment
export default function GridComponent() {
  return (
    <div className="container mx-auto p-6">
      <div className="${containerClasses}">
        <div className="${gridClasses}">
          ${config.mockData
            .map(
              (item, i) => `<div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg border">
            <h3 className="font-semibold">${item}</h3>
            <p className="text-sm text-muted-foreground">Grid item content</p>
          </div>`,
            )
            .join("\n          ")}
        </div>
      </div>
    </div>
  )
}`

      case "nuxt":
      case "vue":
        return `<!-- Updated Vue template with alignment classes -->
<template>
  <div class="container mx-auto p-6">
    <div class="${containerClasses}">
      <div class="${gridClasses}">
        <div 
          v-for="(item, i) in items" 
          :key="i"
          class="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg border"
        >
          <h3 class="font-semibold">{{ item }}</h3>
          <p class="text-sm text-muted-foreground">Grid item content</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const items = ${JSON.stringify(config.mockData)}
</script>

<style scoped>
/* Optional: Add custom styles here */
</style>`

      case "html":
        return `<!-- Added complete HTML with container wrapper and CSS -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Grid Layout</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div class="container mx-auto p-6">
    <div class="${containerClasses}">
      <div class="${gridClasses}">
        ${config.mockData
          .map(
            (item) => `<div class="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg border">
          <h3 class="font-semibold">${item}</h3>
          <p class="text-sm text-muted-foreground">Grid item content</p>
        </div>`,
          )
          .join("\n        ")}
      </div>
    </div>
  </div>
</body>
</html>`

      default:
        return ""
    }
  }, [config, framework, generateGridClasses, getPreviewContainerWidth, getContainerAlignmentClasses])

  const getResponsiveBreakpoint = useCallback((width: number) => {
    if (width < 640) return "sm"
    if (width < 768) return "md"
    if (width < 1024) return "lg"
    return "xl"
  }, [])

  const getCurrentCols = () => {
    return config.cols[previewMode]
  }

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    setIsResizing(true)
    e.preventDefault()
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return

      const container = document.getElementById("preview-container")
      if (!container) return

      const rect = container.getBoundingClientRect()
      const newWidth = Math.max(320, Math.min(1400, e.clientX - rect.left))

      setPreviewWidth(newWidth)
      const newBreakpoint = getResponsiveBreakpoint(newWidth)
      if (newBreakpoint !== previewMode) {
        setPreviewMode(newBreakpoint)
      }
    },
    [isDragging, getResponsiveBreakpoint, previewMode],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setIsResizing(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  useEffect(() => {
    const container = document.getElementById("preview-container")
    if (container) {
      setDisplayableWidth(isDragging ? previewWidth : container.offsetWidth)
    }
  }, [previewWidth, isDragging])

  const handleMockDataChange = (value: string) => {
    setMockDataType(value)
    switch (value) {
      case "default":
        setConfig({ ...config, mockData: defaultMockData.slice(0, config.items) })
        break
      case "ecommerce":
        setConfig({ ...config, mockData: mockDataTemplates.ecommerce.slice(0, config.items) })
        break
      case "portfolio":
        setConfig({ ...config, mockData: mockDataTemplates.portfolio.slice(0, config.items) })
        break
      case "blog":
        setConfig({ ...config, mockData: mockDataTemplates.blog.slice(0, config.items) })
        break
      case "team":
        setConfig({ ...config, mockData: mockDataTemplates.team.slice(0, config.items) })
        break
      case "custom":
        break
      default:
        break
    }
  }

  const copyToClipboard = useCallback(async (text: string, type = "โค้ด", event?: React.MouseEvent) => {
    try {
      await navigator.clipboard.writeText(text)

      setAlertMessage(`${type} copy clipboard `)
      setShowAlert(true)

      // Hide alert after 3 seconds
      setTimeout(() => {
        setShowAlert(false)
      }, 3000)
    } catch (err) {
      setAlertMessage(`can not copy ${type}`)
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 3000)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
            <Grid className="h-8 w-8 text-blue-600" />
            Tailwind CSS Grid Generator
          </h1>
          <p className="text-muted-foreground">create responsive grid layout with preview and copy code</p>
        </div>

        {/* Grid Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              การตั้งค่า Grid
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Responsive Columns */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Responsive Columns</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm">
                    <Copy className="h-4 w-4" />
                    SM (&lt;640px)
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    max="12"
                    value={config.cols.sm}
                    onChange={(e) => updateConfig("cols", { ...config.cols, sm: Number.parseInt(e.target.value) || 1 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm">
                    <Download className="h-4 w-4" />
                    MD (640px+)
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    max="12"
                    value={config.cols.md}
                    onChange={(e) => updateConfig("cols", { ...config.cols, md: Number.parseInt(e.target.value) || 1 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm">
                    <Eye className="h-4 w-4" />
                    LG (768px+)
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    max="12"
                    value={config.cols.lg}
                    onChange={(e) => updateConfig("cols", { ...config.cols, lg: Number.parseInt(e.target.value) || 1 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm">
                    <Palette className="h-4 w-4" />
                    XL (1024px+)
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    max="12"
                    value={config.cols.xl}
                    onChange={(e) => updateConfig("cols", { ...config.cols, xl: Number.parseInt(e.target.value) || 1 })}
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Gap and Items */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Rows (0 = auto)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="20"
                    value={config.rows}
                    onChange={(e) => updateConfig("rows", Number.parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Gap</Label>
                  <Input
                    type="number"
                    min="0"
                    max="20"
                    value={config.gap}
                    onChange={(e) => updateConfig("gap", Number.parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Items</Label>
                  <Input
                    type="number"
                    min="1"
                    max="50"
                    value={config.items}
                    onChange={(e) => {
                      const newItems = Number.parseInt(e.target.value) || 1
                      updateConfig("items", newItems)
                      updateMockData(newItems)
                    }}
                  />
                </div>
              </div>

              {/* Mock Data */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Mock Data Template</Label>
                  <Select value={mockDataType} onValueChange={handleMockDataChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="portfolio">Portfolio</SelectItem>
                      <SelectItem value="blog">Blog</SelectItem>
                      <SelectItem value="team">Team</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {mockDataType === "custom" && (
                  <div className="space-y-2">
                    <Label>Custom Data (comma separated)</Label>
                    <Textarea
                      placeholder="Item 1, Item 2, Item 3..."
                      value={customMockData}
                      onChange={(e) => setCustomMockData(e.target.value)}
                      rows={3}
                    />
                    <Button
                      size="sm"
                      onClick={() => {
                        const items = customMockData
                          .split(",")
                          .map((item) => item.trim())
                          .filter(Boolean)
                        if (items.length > 0) {
                          updateConfig("mockData", items.slice(0, config.items))
                        }
                      }}
                    >
                      Apply Custom Data
                    </Button>
                  </div>
                )}
              </div>

              {/* Framework Selection */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Framework</Label>
                  <Select value={framework} onValueChange={setFramework}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {frameworks.map((fw) => (
                        <SelectItem key={fw.id} value={fw.id}>
                          {fw.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Interactive Preview
            </CardTitle>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label className="text-sm">Container:</Label>
                  <Select value={previewMode} onValueChange={(value: any) => setPreviewMode(value)}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sm">SM</SelectItem>
                      <SelectItem value="md">MD</SelectItem>
                      <SelectItem value="lg">LG</SelectItem>
                      <SelectItem value="xl">XL</SelectItem>
                      <SelectItem value="full">Full</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-sm">Align:</Label>
                  <Select value={containerAlignment} onValueChange={(value: any) => setContainerAlignment(value)}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label className="text-sm">Grid Lines:</Label>
                  <Button
                    variant={showGridLines ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowGridLines(!showGridLines)}
                  >
                    {showGridLines ? "Show" : "Hide"}
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-sm">Theme:</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-sm">Zoom:</Label>
                  <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(50, zoom - 10))}>
                    -
                  </Button>
                  <span className="text-sm w-12 text-center">{zoom}%</span>
                  <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(200, zoom + 10))}>
                    +
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setZoom(100)
                    setPreviewMode("lg")
                  }}
                >
                  Reset View
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center text-sm text-muted-foreground mb-4">
              💡 Drag the right edge to test responsive real-time
            </div>

            <div
              id="preview-container"
              className="relative mx-auto bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700"
              style={{
                width: isDragging
                  ? `${previewWidth}px`
                  : previewMode === "full"
                    ? "100%"
                    : previewMode === "xl"
                      ? "1280px"
                      : previewMode === "lg"
                        ? "1024px"
                        : previewMode === "md"
                          ? "768px"
                          : "640px",
                maxWidth: "100%",
                transform: `scale(${zoom / 100})`,
                transformOrigin: "top center",
                transition: isDragging ? "none" : "all 0.3s ease",
                cursor: isDragging ? "ew-resize" : "default",
                minWidth: "320px",
              }}
              onMouseDown={handleMouseDown}
            >
              {/* Preview Info Bar */}
              <div className="flex items-center justify-between mb-4 text-xs bg-white dark:bg-gray-800 p-2 rounded border">
                <div className="flex items-center gap-4">
                  <span className="font-semibold">{getCurrentCols()} columns</span>
                  <span className="text-muted-foreground">{previewMode} breakpoint</span>
                  <span className="text-muted-foreground">{config.items} items</span>
                  <span className="text-muted-foreground">
                    {Math.round(displayableWidth)}
                    px
                  </span>
                </div>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>

              {/* Grid Preview */}
              <div
                className={`${getPreviewContainerWidth()} ${getContainerAlignmentClasses()} ${generateGridClasses()} ${
                  showGridLines ? "border border-dashed border-blue-300 dark:border-blue-700" : ""
                } ${theme === "dark" ? "dark" : ""}`}
                style={{
                  minHeight: config.rows > 0 ? `${config.rows * 100}px` : "auto",
                }}
              >
                {Array.from({ length: config.items }).map((_, i) => (
                  <div
                    key={i}
                    className={`bg-blue-100 dark:bg-blue-900 p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                      showGridLines ? "border-dashed border-blue-200 dark:border-blue-700" : ""
                    }`}
                    style={{
                      minHeight: "80px",
                      backgroundColor: showGridLines ? "rgba(59, 130, 246, 0.1)" : undefined,
                    }}
                  >
                    <div className="font-semibold text-blue-600 mb-1">{config.mockData[i] || `Grid Item ${i + 1}`}</div>
                    <div className="text-xs text-muted-foreground">Col: {i + 1}</div>
                  </div>
                ))}
              </div>

              {/* Breakpoint Indicators */}
              <div className="flex justify-center gap-4 mt-4 text-xs">
                <div
                  className={`px-2 py-1 rounded ${previewMode === "sm" ? "bg-orange-100 text-orange-800" : "text-muted-foreground"}`}
                >
                  📱 SM (320px+)
                </div>
                <div
                  className={`px-2 py-1 rounded ${previewMode === "md" ? "bg-blue-100 text-blue-800" : "text-muted-foreground"}`}
                >
                  📱 MD (640px+)
                </div>
                <div
                  className={`px-2 py-1 rounded ${previewMode === "lg" ? "bg-green-100 text-green-800" : "text-muted-foreground"}`}
                >
                  💻 LG (768px+)
                </div>
                <div
                  className={`px-2 py-1 rounded ${previewMode === "xl" ? "bg-purple-100 text-purple-800" : "text-muted-foreground"}`}
                >
                  🖥️ XL (1024px+)
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generated Code */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Generated Code
            </CardTitle>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Framework:</Label>
                <Select value={framework} onValueChange={setFramework}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {frameworks.map((fw) => (
                      <SelectItem key={fw.id} value={fw.id}>
                        {fw.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={(e) => copyToClipboard(generateCode(), "โค้ดทั้งหมด", e)}
                  size="sm"
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  <Copy className="h-4 w-4" />
                  Copy Full Code
                </Button>
                <Button
                  onClick={(e) => copyToClipboard(generateGridClasses(), "Grid Classes", e)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 border-blue-200 hover:bg-blue-50"
                >
                  <Copy className="h-4 w-4" />
                  Copy Grid Classes
                </Button>
                <Button
                  onClick={(e) =>
                    copyToClipboard(
                      `${getPreviewContainerWidth()} ${generateGridClasses()}`,
                      "Container + Grid Classes",
                      e,
                    )
                  }
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 border-green-200 hover:bg-green-50"
                >
                  <Copy className="h-4 w-4" />
                  Copy with Container
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-lg">
              <div className="absolute top-3 right-3 z-10">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 bg-gray-800/90 backdrop-blur-sm px-3 py-1.5 rounded-full font-medium">
                    {framework === "nextjs" ? "TSX" : framework === "nuxt" || framework === "vue" ? "Vue" : "HTML"}
                  </span>
                  <Button
                    onClick={(e) => copyToClipboard(generateCode(), "โค้ดทั้งหมด", e)}
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 bg-gray-800/90 backdrop-blur-sm hover:bg-gray-700/90 text-gray-300 hover:text-white rounded-full"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              <div className="relative">
                {showAlert && (
                  <Alert className="absolute top-4 left-4 right-4 z-10 bg-green-50 border-green-200 shadow-lg animate-in slide-in-from-top duration-300">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800 font-medium">✅ {alertMessage}</AlertDescription>
                  </Alert>
                )}

                <pre className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-gray-100 p-6 pt-12 overflow-x-auto text-sm leading-relaxed min-h-[300px] max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                  <code
                    dangerouslySetInnerHTML={{ __html: highlightCode(generateCode()) }}
                    className="block whitespace-pre font-mono"
                  />
                </pre>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-gray-900/50 to-transparent pointer-events-none"></div>
            </div>

            <div className="mt-6 p-5 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
              <h4 className="font-semibold mb-4 text-sm flex items-center gap-2 text-gray-800 dark:text-gray-200">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Quick Reference
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="space-y-2">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Grid Classes:</span>
                  <div className="relative group">
                    <code className="block p-3 bg-white dark:bg-gray-900 rounded-lg text-green-600 dark:text-green-400 font-mono border border-green-200 dark:border-green-800 shadow-sm">
                      {generateGridClasses()}
                    </code>
                    <Button
                      onClick={(e) => copyToClipboard(generateGridClasses(), "Grid Classes", e)}
                      size="sm"
                      variant="ghost"
                      className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Container:</span>
                  <div className="relative group">
                    <code className="block p-3 bg-white dark:bg-gray-900 rounded-lg text-blue-600 dark:text-blue-400 font-mono border border-blue-200 dark:border-blue-800 shadow-sm">
                      {getPreviewContainerWidth()}
                    </code>
                    <Button
                      onClick={(e) => copyToClipboard(getPreviewContainerWidth(), "Container Classes", e)}
                      size="sm"
                      variant="ghost"
                      className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Current Breakpoint:</span>
                  <code className="block p-3 bg-white dark:bg-gray-900 rounded-lg text-purple-600 dark:text-purple-400 font-mono border border-purple-200 dark:border-purple-800 shadow-sm">
                    {previewMode.toUpperCase()} (${getCurrentCols()} cols)
                  </code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
