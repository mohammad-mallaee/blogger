export default function Heading({ depth, ...props }: { depth: number, children?: any }) {
    const text = props.children
    const id = text.toLowerCase().replace(/\s/g, "-")
    switch (depth) {
        case 1:
            return <h1 id={id} {...props}>{text}</h1>
        case 2:
            return <h2 id={id} {...props}>{text}</h2>
        case 3:
            return <h3 id={id} {...props}>{text}</h3>
    }
}