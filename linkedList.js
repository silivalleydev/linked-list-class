// 노드클래스는 데이터와 next(포인터)로 이루어져있다.
class LinkedListNode {
    constructor(value) {
        this.data = value;
        this.next = null;
    }
}

// 링크드리스트는 헤드 노드부터 다음노드까지 쭉 이어지는 리스트이다.
class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    isEmpty() {
        return this.size === 0;
    }

    insert(value) {
        // 링크드리스트가 비어있다면
        if (this.isEmpty()) {
            // console.log(value)
            // 헤드에 새로운 노드를 넣어준다.
            this.head = new LinkedListNode(value);
            // console.log(this.head);
        } else {
            // 기존 헤드의 노드를 변수에 저장한다.
            let copy = this.head;
            // 헤드에 새로 입력된 노드를 저장한다.
            this.head = new LinkedListNode(value);
            // 새로 입력된 노드의 다음노드로 카피된 헤드 노드를 지정한다.
            this.head.next = copy;
            // 사이즈가 늘어났기 때문에 size 변수에 1을 더해준다
        }
        this.size++;
    }

    remove(value) {
        // 현재 헤드에 있는 노드를 가져온다
        let current = this.head;

        // 현재 헤드 노드의 데이터와 삭제할 값이 같으면 
        if (current.data === value) {
            // 헤드를 현재 헤드 노드의 다음 노드를 지정해준다.
            this.head = current.next;
            // 삭제했으니 사이즈값을 -1해준다.
            this.size--;
        } else {
            let prev = current;
            let error = true;

            // current.next가 null일 때까지 반복(즉, 마지막 노드까지 반복)
            while(current.next) {
                // 최근 노드의 데이터가 value와 같으면 삭제 대상인 노드이다.
                if (current.data === value) {
                    // 이전 노드의 다음 노드를 최근 노드의 다음노드를 넣어줌
                    prev.next = current.next;
                    // 현재 노드는 최근 노드의 다음 노드로 넣어준다.
                    current = current.next;
                    
                    error = false;
                }
                // 이전노드에 현재노드를 넣어준다
                prev = current;
                // 현재 노드는 최근 노드의 다음 노드로 넣어준다.
                current = current.next;
            }

            // 위의 while문을나오면 마지막 노드가 current에 세팅되는데 만약 마지막노드의 데이터가 value와 일치한다면
            if (current.data === value) {
                // 이전노드의 다음을 null로 바꿔준다
                prev.next = null;
                error = false;
            }

            if(error) console.log(`There is no ${value}`) 
            else this.size--
        }
    }

    removeHead(){
        let value = null;
        // 만약 헤드 노드가 null이 아니라면
        if(this.head != null){
            // value에 head의 데이터를 넣고 <-- 어떤 데이터가 삭제되었는지 알려주기 위해
            value = this.head.data;

            // 헤드에 헤드노드의 다음노드를 지정해주고
            this.head = this.head.next;

            // 사이즈를 마이너스한다.
            this.size--;
        }
        return value
    }

    search(value){
        // current에 헤드노드를 먼저 넣고 <-- 맨 처음부터 탐색
        let current = this.head;
        let index = 0;
        // current 노드의 다음노드가 null 일때까지 즉, 마지막 노드까지 순회
        while(current.next){

            // current 데이터가 value와 같으면 몇번쨰인지 반환
            if(current.data == value) return index;
            // 위의 조건에 안맞다면 current에 다음노드를 넣어준다.
            current = current.next;
            index++;
        }
        return false
    }

    print(){
        let result = "";
        // current에 헤드노드를 넣어준다.
        let current = this.head;
        // 마지막 노드에 도달할때까지 순회한다.
        while(current.next){
            // 최근노드의 데이터 순으로 출력한다.
            result += `${current.data} => `;
            // 최근노드에 다음노드를 넣어준다.
            current = current.next
        }
        // 마지막노드의 데이터도 넣어준다.
        result += current.data

        console.log(result)
    }
}


(function test(){
    let ll = new LinkedList()

    for(let i=1; i<=5; i++) ll.insert(i) 
    ll.print() // 5=>4=>3=>2=>1

    ll.remove(3) 
    ll.print() // 5=>4=>2=>1

    ll.removeHead()
    ll.print() // 4=>2=>1

    ll.remove(5) //error!
})()