import { Button, Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, Spinner, Title } from "@/components/ui"
import Link from "next/dist/client/link"


export default function Discounts() {
    return (
        <Empty className="w-full">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <Spinner />
                </EmptyMedia>
                <EmptyTitle>Данная страница находится в разработке</EmptyTitle>
                <EmptyDescription>
                    Следите за новостями в <Link href="/social">социальных сетях</Link>
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
}