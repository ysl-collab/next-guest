"use client";

import Image from "next/image";
import { Button, Card } from "@/components/ui/index";
import { Container } from "@/components/shared/container";
import { Title } from "@/components/ui";
import { toast } from "sonner";

export default function Home() {
    return (
        <Container className="flex flex-col items-start justify-center gap-4 py-10">
            <div className="flex items-center w-full justify-between">
                <Title>Меню</Title>
                <Button
                    variant="default"
                    onClick={() =>
                        toast.success("Заголовок уведомления", {
                            description: "Здесь находится описание!",
                            position: "bottom-center",
                        })
                    }
                >
                    Показать уведомление
                </Button>

            </div>
        </Container>
    );
}
