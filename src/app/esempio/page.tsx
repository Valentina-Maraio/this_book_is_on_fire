import { Badge } from "@/components/ui/badge"

export default function EsempioPage(props: any) {

    return (
        <div>
            <h3>esempi ed esercizi dal cordo Hello React</h3>
            <h2>{props.title}</h2>
            {props.ingredients.map((ingredient: any, index: any) => {
                return (
                    <div key={index}>
                        <li>{ingredient.name} - {ingredient.prepared === 'false' ? 'done' : 'to do'}</li>
                    </div>
                )
            })}
            {props.feedback.rating <= 3.5 ? <Badge variant="destructive">Bad</Badge> : <Badge>Good</Badge>}
        </div>
    )
}