import Image from "next/image";
import { Button } from "@/components/ui/index";
import { Container } from "@/components/shared/container";
import { Title } from "@/components/ui";
import { Categories } from "@/components/shared/categories";

export default function Cart() {
    return (
        <Container className="flex flex-col items-start justify-center gap-4 py-10">
            <Title>Корзина</Title>
            
        </Container>
    );
}
