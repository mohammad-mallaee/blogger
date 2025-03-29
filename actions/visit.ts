export default function visit(tree: any, type: string, callback: (node: any) => void) {
    if (tree.type === type)
        callback(tree)
    if (tree.children) {
        for (const child of tree.children) {
            visit(child, type, callback)
        }
    }
}