// Exclude<U,V> -> remove from U those member assinable to V
// Extract<U, V> -> keep from U those nembers assinable to V
// Nonnullable

type EventType1 = "click" | "submit" | "hover" | "keydown" | "keyup";

type EventType2 = Exclude<EventType1, "keydown">

function handleEvent(e: EventType2){
    console.log(e);
}

handleEvent("hover")

type ActionsN1 = "create" | "update" | "delete"
type ActionsN2 = Extract<ActionsN1, "create" | "update">

function handleEvent2(e: ActionsN2){
    console.log(e)
}

handleEvent2("create")

type MaybeNumber = number | null | undefined;
type CleanNumber = NonNullable<MaybeNumber> // key only number

function square(num: CleanNumber){
    return num * 2
}

square(1)