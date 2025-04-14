"use client"
import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group"
import { Select, SelectTrigger } from "@radix-ui/react-select"

import { useIsMobile } from "@/hooks/use-mobile"

import books from '../app/dashboard/banned_books.json'
import { z } from "zod"

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    desktop: {
        label: "Desktop",
        color: "var(--primary)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--primary)",
    },
} satisfies ChartConfig

export function ChartAreaInteractive() {
    const isMobile = useIsMobile()
    const [timeRange, setTimeRange] = React.useState("90d")

    React.useEffect(() => {
        if (isMobile) {
            setTimeRange("7d")
        }
    }, [isMobile])
}

type Book = {
    Author: string,
    Title: string,
    Type_of_ban: string,
    Secondary_author: string,
    Illustrator: string,
    Translator: string,
    State: string,
    District: string,
    Date_of_challenge_or_removal: string,
    Origin_of_challenge: string
}

export default function BannedBooksTablePage() {
    const [randomAuthors, setRandomAuthors] = React.useState<Book[]>([]);
    const [randomTitle, setRandomTitle] = React.useState<Book[]>([]);

    React.useEffect(() => {
        const uniqueAuthors = [...new Set(books.map(book => book.Author))]
        const randomizedAuthors = uniqueAuthors.sort(() => 0.5 - Math.random()).slice(0, 10)

        setRandomAuthors(randomizedAuthors)

        const randomizedTitles = [...books].sort(() => 0.5 - Math.random()).slice(0, 10)
        setRandomTitle(randomizedTitles)
    }, [books])


    // how many books has got an author banend?
    const authorsBannedBooks = (firstTenAuthors: []) => {
        return firstTenAuthors.map(author => {
            const bannedBooks = books.filter(book => book.Author === author)
            return {
                author: author,
                bannedBooks: bannedBooks.length
            }
        })
    }



    return (
        <div>
            <Card className="@container/card">
                <CardHeader>
                    <CardTitle>Total Visitors</CardTitle>
                    <CardDescription>
                        <span className="hidden @[540px]/card:block">
                            Total of books banned in 2025
                        </span>
                    </CardDescription>
                    <CardAction>
                    </CardAction>
                    <Tabs defaultValue="account" className="w-[400px]">
                        <TabsList>
                            <TabsTrigger value="account">First 10 more banned authors</TabsTrigger>
                            <TabsTrigger value="password">First 10 more banned books</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account">
                            {randomAuthors.map((book, author) => {
                                return (
                                    <div>
                                        <h3>{book.Author}</h3>
                                    </div>
                                )
                            })}
                        </TabsContent>
                        <TabsContent value="password">
                            {randomTitle.map((book) => {
                                return (
                                    <div>
                                        <h3>{book.Title}</h3>
                                    </div>
                                )
                            })}
                        </TabsContent>
                    </Tabs>
                </CardHeader>
            </Card>
        </div>
    )
}