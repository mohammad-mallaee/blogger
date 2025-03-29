import visit from "@/actions/visit"

export default function remarkTableOfContent(set: (toc: any) => void) {
    const headingNodes: any[] = []
    function createHeading(h: any, m: number) {
        const text = h.children[0].value
        return {
            depth: h.depth,
            text, m,
            id: text.toLowerCase().replace(/\s/g, "-")
        }
    }
    return (tree: any) => {
        visit(tree, "heading", (node: any) => {
            headingNodes.push(node)
        })
        if (headingNodes.length == 0)
            return set([])
        const h = headingNodes[0]
        const headings = [createHeading(h, 1)]
        for (let i = 1; i < headingNodes.length; i++) {
            const h = headingNodes[i]
            const prev = headings[i - 1]
            if (h.depth == prev.depth) {
                headings.push(createHeading(h, prev.m))
            }
            if (h.depth > prev.depth) {
                headings.push(createHeading(h, prev.m + 1))
            }
            if (h.depth < prev.depth) {
                const m = prev.m - ((prev.depth - h.depth) - (prev.depth - prev.m))
                headings.push(createHeading(h, m))
            }
        }
        set(headings)
    }
}
