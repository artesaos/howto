# Collection

__Namespace__

```PHP
use Illuminate Support Collection

__Declaração__

```PHP
//Facade
$collect = Collection::make([1, 2, 3, 4, 5, 6, 7, 8, 10]);

//Helper
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 10]);
```  

__Metodos__

_`all()` - retornar todos os itens da coleção_

```PHP
$collect->all();

//Saída
[1,2,3,4,5,6,7,8,10]
```
___

_`collapse()` - transforma os itens da coleção em uma único array_
```PHP
$collect = collect([
                    ['fruta'=>'maça', 'tempero'=>'pimenta'], 
                    ['eletronico'=>'computador']
                   ]
                  );
                  
$collect->collapse();
 
//Saída
{"fruta":"maça","tempero":"pimenta","eletronico":"computador"}
```
___

_`contains` - verifica se existe o valor dentro de uma coleção se sim retorna true se não retorna false_ 
```PHP
//Array Simples
$collect = collect(['fruta'=>'maça', 'tempero'=>'pimenta']);
var_dump($collect->contains('maça'));
var_dump($collect->contains('fruta'));

//Saída
bool(true)
bool(false)

///ou 

//Array Bidimensional
$collect = collect([['fruta'=>'maça', 'tempero'=>'pimenta'], ['pagamento'=>'luz']]);
var_dump($collect->contains('pagamento', 'luz'));
var_dump($collect->contains('maça', 'fruta'));

//Saída
bool(true)
bool(false)

```
___

_`diff`- retornar um array fazendo a comparação da diferença entre eles, os que forem diferente ele retorna_ 

```PHP
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
$diff = $collect->diff([11,12,13,14,15,16,17,18,19,20]);
var_dump($diff);

//Saída
[1,2,3,4,5,6,7,8,9,10]

///ou 

$collect = collect([1, 2, 3]);
$diff = $collect->diff([1, 2]);
var_dump($diff);

//Saída
{"2":3} // aonde o número 3 é a diferença entres as coleções.
```
___

_`each`- executa uma `function` sobre cada item, ele vai retornar ele mesmo, a função principal é interagir em cada posição e utilizar da melhor maneira fazendo alterações em um lista de informações por exemplo_


```PHP
//Array Simples
$collect = collect([1, 2, 3]);
echo $collect->each(function($i) { return $i; });

//Saida
[1, 2, 3]

///ou

//Array Bidimensioanl
$collect = collect([[1, 2, 3],[4, 5, 6]]);
echo $collect->collapse()->each(function($item) {
    return $item;
});

//Saida
[1, 2, 3, 4, 5, 6]

//Observação eu fiz uma união dos arrays dessa coleção para ficar mais fácil a execução da função em cada item.
```

___

_`fetch` - busca pela posição o elemento em um array bidimensional._

```PHP
$collect = collect([[1, 2, 3, 4, 5, 6],[4,5,6],[0]]);
var_dump($collect->fetch(2));

//Saida
object(Illuminate\Support\Collection)#174 (1) { 
   ["items":protected]=> array(2) { [0]=> int(3) [1]=> int(6) } 
}

///ou 

var_dump($collect->fetch(2)->toArray());

//Saida
array(2) { [0]=> int(3) [1]=> int(6) }
```
___

_`filter` - faz um filtro em sua coleção e retorna um outra coleção os dados que passaram pelo filtro_

```PHP
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
$result = $collect->filter(function($item){
    return ($item % 2 === 0);
});

//Saida (somente os números pares)
{"1": 2,"3": 4,"5": 6,"7": 8,"9": 10}
```
___
_`forPage` - paginação dos resultados_
```PHP
$collect = collect(
            [
                ['id' => 1, 'status' => 1, 'nome' => 'nome 1'],
                ['id' => 2, 'status' => 0, 'nome' => 'nome 2'],
                ['id' => 3, 'status' => 1, 'nome' => 'nome 3'],
                ['id' => 4, 'status' => 1, 'nome' => 'nome 4'],
                ['id' => 5, 'status' => 1, 'nome' => 'nome 5']
            ]
        );
var_dump($collect->forPage(0,3));

//Saida
object(Illuminate\Support\Collection)#174 (1) { 
 ["items":protected]=> array(3) { 
   [0]=> array(3) { ["id"]=> int(3) ["status"]=> int(1) ["nome"]=> string(6) "nome 3" } 
   [1]=> array(3) { ["id"]=> int(4) ["status"]=> int(1) ["nome"]=> string(6) "nome 4" } 
   [2]=> array(3) { ["id"]=> int(5) ["status"]=> int(1) ["nome"]=> string(6) "nome 5" } 
   } 
}
```
___

_`where ou whereLoose` - faz um filtro de valor em um par de chaves informadas._

```PHP
$collect = collect([['fruta'=>'maça'],
                    ['fruta'=>'laranja'],
                    ['fruta'=>'abacate']]);
 $result = $collect->where('fruta','laranja');
 
//Saída
{"1":{"fruta":"laranja"}}
```

___

_`first` - pega o primeiro item da coleção ou o primeiro item conforme alguma condição_

```PHP
Primeiro item da lista
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
return $collect->first();

//Saida
1

///ou

Primeiro item da lista conforme decisão pela chave.
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
return $collect->first(function($key, $value)
{
 return $key > 0;
});

//Saida
2

///ou 

Primeiro item da lista conforme decisão pelo valor.
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
return $collect->first(function($key, $value)
{
 return $value > 5;
});

//Saida
6
```
____

_`flatten` - pega uma matriz coleção_

```PHP
$collect = collect([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],[12,13],1,50,60,[15,25,26]]);
return $collect->flatten();

//Saida
[1,2,3,4,5,6,7,8,9,10,12,13,1,50,60,15,25,26]
```
____

_`flip`- trocar chave por valor e valor por chave de uma coleção_

```PHP
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var_dump($collect->all());
var_dump($collect->flip());

//Saida
[1,2,3,4,5,6,7,8,9,10]
{"1":0,"2":1,"3":2,"4":3,"5":4,"6":5,"7":6,"8":7,"9":8,"10":9}

///ou

$collect = collect(['fruta 1' => 'maça', 'fruta 2' => 'laranja']);
var_dump($collect->all());
var_dump($collect->flip());

//Saida
{"fruta 1":"maça","fruta 2":"laranja"}
{"maça":"fruta 1","laranja":"fruta 2"}

```
____

_`forget`- remove item de uma coleção pela sua chave_

```PHP
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);        
$collect->forget(1);

//Saida (o número dois que pertencia a chave 1 foi removido)
{"0":1,"2":3,"3":4,"4":5,"5":6,"6":7,"7":8,"8":9,"9":10}

///ou

$collect = collect(['fruta 1' => 'maça', 'fruta 2' => 'laranja']);
$collect->forget('fruta 1');

//Saida
{"fruta 2":"laranja"}
```
____

_`get`- resgatar o valor sendo a busca feita pela chave_

```PHP
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var_dump($collect->get(0));

//Saida
1

///ou

$collect = collect(['fruta 1' => 'maça', 'fruta 2' => 'laranja']);
var_dump($collect->get('fruta 1'));

//Saida
maça
```
____

_`groupBy`- agrupando uma coleção mediante pesquisa feita em uma determinada chave_

```PHP
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var_dump($collect->groupBy(function($n){ return $n % 2 === 0;});

//Saida (agrupamento realizado dos valores impares em um coleção e pares em outra)
[[1,3,5,7,9],[2,4,6,8,10]]

///ou

$collect = collect(
    [
        ['id' => 1, 'status' => 1, 'nome' => 'nome 1'],
        ['id' => 2, 'status' => 0, 'nome' => 'nome 2'],
        ['id' => 3, 'status' => 1, 'nome' => 'nome 3'],
        ['id' => 4, 'status' => 1, 'nome' => 'nome 4']
    ]
);
var_dump( $collect->groupBy(function($n){ return $n['status'] === 1; }));

//Saida
{
 "1":[
      {"id":1,"status":1,"nome":"nome 1"},
      {"id":3,"status":1,"nome":"nome 3"},
      {"id":4,"status":1,"nome":"nome 4"}
     ],
 "0":[
      {"id":2,"status":0,"nome":"nome 2"}
     ]
}
```
___

_`keyBy` - _

___

_`has` - determina se o item existente na coleção por um chave_

```PHP
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var_dump($collect->has(9));

//Saida
bool(true)

///ou

$collect = collect(['id' => 1, 'status' => 1, 'nome' => 'nome 1']);
var_dump($collect->has('id'));

//Saida
bool(true)
```
____

_`implode` - concatenar valores de uma determinada chave como uma string._

```PHP
$collect = collect(
            [
                ['id' => 1, 'status' => 1, 'nome' => 'nome 1'],
                ['id' => 2, 'status' => 0, 'nome' => 'nome 2'],
                ['id' => 3, 'status' => 1, 'nome' => 'nome 3'],
                ['id' => 4, 'status' => 1, 'nome' => 'nome 4']
            ]
        );
var_dump($collect->implode('id', '-'));

//Saida
string(7) "1-2-3-4"
```        

_`intersect` - intersecção a coleção com os objetos disponíveis._
```PHP

```


_`isEmpty()` - função que verifica se não existe itens na coleção_
```PHP
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var_dump($collect->isEmpty());

//Saida
bool(false)

///ou

$collect = collect([]);
var_dump($collect->isEmpty());

//Saida
bool(true)
```
___ 

_`keys()` - retornar todas as chaves de uma coleção_
```PHP
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var_dump($collect->keys());

//Saida
array(10) { [0]=> int(0) [1]=> int(1) [2]=> int(2) [3]=> int(3) [4]=> int(4) 
            [5]=> int(5) [6]=> int(6) [7]=> int(7) [8]=> int(8) [9]=> int(9)
         }
         
///ou

$collect = collect(['id' => 1, 'status' => 1, 'nome' => 'nome 1']);
var_dump($collect->keys());

//Saida
array(3) {[0]=> string(2) "id" [1]=> string(6) "status" [2]=> string(4) "nome" }
```
____

_`last()` - retornaro último item de um array_
```PHP
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 10]);
var_dump($collect->last());

//Saida
10
```
___
 
_`lists` - obter um coleção com os valores de uma chave_
```PHP
$collect = collect(
            [
                ['id' => 1, 'status' => 1, 'nome' => 'nome 1'],
                ['id' => 2, 'status' => 0, 'nome' => 'nome 2'],
                ['id' => 3, 'status' => 1, 'nome' => 'nome 3'],
                ['id' => 4, 'status' => 1, 'nome' => 'nome 4']
            ]
        );
var_dump($collect->lists('nome', 'id'));

//Saida
array(4) { [1]=> string(6) "nome 1" 
           [2]=> string(6) "nome 2" 
           [3]=> string(6) "nome 3" 
           [4]=> string(6) "nome 4" 
         }
```
___

_`map`- _

```PHP
$collect = collect(
            [
                ['id' => 1, 'status' => 1, 'nome' => 'nome 1'],
                ['id' => 2, 'status' => 0, 'nome' => 'nome 2'],
                ['id' => 3, 'status' => 1, 'nome' => 'nome 3'],
                ['id' => 4, 'status' => 1, 'nome' => 'nome 4']
            ]
        );
var_dump($collect->map(function($item){
    $item['status'] = ($item['status'] === 1);
    return $item;
})->all());

//Saida
array(4) { 
   [0]=> array(3) { ["id"]=> int(1) ["status"]=> bool(true) ["nome"]=> string(6) "nome 1" } 
   [1]=> array(3) { ["id"]=> int(2) ["status"]=> bool(false) ["nome"]=> string(6) "nome 2" } 
   [2]=> array(3) { ["id"]=> int(3) ["status"]=> bool(true) ["nome"]=> string(6) "nome 3" } 
   [3]=> array(3) { ["id"]=> int(4) ["status"]=> bool(true) ["nome"]=> string(6) "nome 4" } 
}
```
___

_`merge` - adicionar na atual coleção valores informados_
```PHP
$collect = collect(
            [
                ['id' => 1, 'status' => 1, 'nome' => 'nome 1'],
                ['id' => 2, 'status' => 0, 'nome' => 'nome 2'],
                ['id' => 3, 'status' => 1, 'nome' => 'nome 3'],
                ['id' => 4, 'status' => 1, 'nome' => 'nome 4']
            ]
        );
var_dump($collect->merge([['id' => 5, 'status' => 1, 'nome' => 'nome 5']])->toArray());

//Saida
array(5) { 
    [0]=> array(3) { ["id"]=> int(1) ["status"]=> int(1) ["nome"]=> string(6) "nome 1" } 
    [1]=> array(3) { ["id"]=> int(2) ["status"]=> int(0) ["nome"]=> string(6) "nome 2" } 
    [2]=> array(3) { ["id"]=> int(3) ["status"]=> int(1) ["nome"]=> string(6) "nome 3" } 
    [3]=> array(3) { ["id"]=> int(4) ["status"]=> int(1) ["nome"]=> string(6) "nome 4" } 
    [4]=> array(3) { ["id"]=> int(5) ["status"]=> int(1) ["nome"]=> string(6) "nome 5" } 
}
```

____

_`pop()` - recupera e exclui o último valor da coleção e_

```PHP
$collect = collect(
            [
                ['id' => 1, 'status' => 1, 'nome' => 'nome 1'],
                ['id' => 2, 'status' => 0, 'nome' => 'nome 2'],
                ['id' => 3, 'status' => 1, 'nome' => 'nome 3'],
                ['id' => 4, 'status' => 1, 'nome' => 'nome 4'],
                ['id' => 5, 'status' => 1, 'nome' => 'nome 5']
            ]
        );
var_dump($collect->pop());
var_dump($collect->all());

//Saida
array(3) { ["id"]=> int(5) ["status"]=> int(1) ["nome"]=> string(6) "nome 5" } 
 
array(4) { 
   [0]=> array(3) { ["id"]=> int(1) ["status"]=> int(1) ["nome"]=> string(6) "nome 1" } 
   [1]=> array(3) { ["id"]=> int(2) ["status"]=> int(0) ["nome"]=> string(6) "nome 2" } 
   [2]=> array(3) { ["id"]=> int(3) ["status"]=> int(1) ["nome"]=> string(6) "nome 3" } 
   [3]=> array(3) { ["id"]=> int(4) ["status"]=> int(1) ["nome"]=> string(6) "nome 4" } 
}
```
____
_`prepend` - empurre um item para o início da coleção._

```PHP
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
$collect->prepend(10);
var_dump($collect->all());

//Saida
array(11) { 
   [0]=> int(10) 
   [1]=> int(1) 
   [2]=> int(2) 
   [3]=> int(3) 
   [4]=> int(4) 
   [5]=> int(5) 
   [6]=> int(6) 
   [7]=> int(7) 
   [8]=> int(8) 
   [9]=> int(9) 
   [10]=> int(10) 
}
```
___

_`push`- empurre um item para o final da coleção._

```PHP
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
$collect->push(1);
var_dump($collect->all());

//Saida
array(11) { 
   [0]=> int(1) 
   [1]=> int(2) 
   [2]=> int(3) 
   [3]=> int(4) 
   [4]=> int(5) 
   [5]=> int(6) 
   [6]=> int(7) 
   [7]=> int(8) 
   [8]=> int(9) 
   [9]=> int(10) 
   [10]=> int(1) 
}
```
___ 

_`pull`- remove um item da coleção pela sua chave._
```PHP
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
$collect->pull(1);
var_dump($collect->all());

//Saida
array(9) { 
   [0]=> int(1) 
   [2]=> int(3) 
   [3]=> int(4) 
   [4]=> int(5) 
   [5]=> int(6) 
   [6]=> int(7) 
   [7]=> int(8) 
   [8]=> int(9) 
   [9]=> int(10) 
}
```

___

_`put` - coloque um item na coleção por chave se exister o item é sobreescrito._
```PHP
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
$collect->put(0,100);
var_dump($collect->all());
        
//Saida
array(10) { 
   [0]=> int(100) 
   [1]=> int(2) 
   [2]=> int(3) 
   [3]=> int(4) 
   [4]=> int(5) 
   [5]=> int(6) 
   [6]=> int(7) 
   [7]=> int(8) 
   [8]=> int(9) 
   [9]=> int(10) 
}
```
___

_`random` - obter um ou mais itens aleatoriamente a partir da coleção._
```PHP
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var_dump($collect->random());
var_dump($collect->random());
var_dump($collect->random());

//Saida
int(6) 
int(3) 
int(1)

///ou

$collect = collect(['fruta 1' => 'maça', 'fruta 2' => 'laranja']);
var_dump($collect->random());
var_dump($collect->random());
var_dump($collect->random());

//Saida
string(7) "laranja" 
string(7) "laranja" 
string(5) "maça"
```
___

_`reduce` - reduzir a coleção para um único valor._
```PHP
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var_dump($collect->reduce(function ($a,$b){
    return $a + $b;
}));

//Saida
int(55)
```
____

_`reject` - criar uma coleção de todos os elementos que não passam um determinado teste verdade._

```PHP
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var_dump($collect->reject(function ($a){
    return ($a % 2 !== 0);
})->toArray());

//Saida
array(5) { 
   [1]=> int(2) 
   [3]=> int(4) 
   [5]=> int(6) 
   [7]=> int(8) 
   [9]=> int(10) 
}
```
____

_`reverse()`- itens da coleção em ordem inversa._
```PHP
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var_dump($collect->reverse()->toArray());
 
//Saida
array(10) {
   [0]=> int(10) 
   [1]=> int(9) 
   [2]=> int(8) 
   [3]=> int(7) 
   [4]=> int(6) 
   [5]=> int(5) 
   [6]=> int(4) 
   [7]=> int(3) 
   [8]=> int(2) 
   [9]=> int(1) 
}
```
___ 

_`search`- pesquisar a coleção para um dado valor e retornar a chave correspondente caso seja encontrado._
```PHP
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var_dump($collect->search(3));

//Saida
int(2)
```
____
_`shift()`- obter e remover o primeiro item da coleção._
```PHP
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var_dump($collect->shift());

//Saida
int(1)
```
___

_`shuffle()` - embaralhar os itens da coleção._ 
```PHP
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var_dump($collect->shuffle());

//Saida
array(10) { 
   [0]=> int(6) 
   [1]=> int(9) 
   [2]=> int(8) 
   [3]=> int(7) 
   [4]=> int(3) 
   [5]=> int(4) 
   [6]=> int(2) 
   [7]=> int(5) 
   [8]=> int(1) 
   [9]=> int(10) 
}
```
___

_`slice` - fatie a matriz coleção subjacente, ou, pega partes informando o inicio e o fim chave._ 
```PHP
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var_dump($collect->slice(3,3, false)->toArray());

//Saida
array(3) { 
 [0]=> int(4) 
 [1]=> int(5) 
 [2]=> int(6) 
}
```
___

_`chunk` - divide o array em partes conforme quantidade de itens até o fim da coleção_
```PHP
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var_dump($collect->chunk(3, false)->toArray());

//Saida
array(4) {
  [0]=> array(3) {[0]=> int(1) [1]=> int(2) [2]=> int(3) }
  [1]=> array(3) {[0]=> int(4) [1]=> int(5) [2]=> int(6) }
  [2]=> array(3) {[0]=> int(7) [1]=> int(8) [2]=> int(9) }
  [3]=> array(1) {[0]=> int(10) }
}
```
____

_`sort` - ordenar por cada item conforme a `function`._

```PHP
$collect = collect(['d' => 2, 'a' => 1, 'z' => 0]);
return $collect->sort(function($a, $b){
    return $a == $b ? 0: ($a > $b ? 1 : -1);
})->toArray();

//Saida
{ "z": 0, "a": 1, "d": 2}
```
____
_`sortBy` - ordenar por cada item conforme a `function`._

```PHP
return $collect->sortBy(function($a) {
    return $a;
}, SORT_REGULAR, false)->toArray();

//Saida
{"z":0,"a":1,"d":2}
```
____

_`sortByDesc` - apelido do `sortBy` já ordenando para descendente conforme a `function`._

```PHP
return $collect->sortByDesc(function($a) {
    return $a;
}, SORT_REGULAR)->toArray();

//Saida
{"d":2,"a":1,"z":0}
```
____

_`splice` - retornar partes da coleção._

```PHP
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
return $collect->splice(5,1);

//Saida
{6}
```

___
_`sum` - retornar a soma dos elementos._
```PHP
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
return $collect->sum();

//Saida
55

///ou

$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
return $collect->sum(function($a){
    if ($a > 5)
    {
        return $a;
    }
    return 0;
});

//Saida
40
```
___

_`take`- quantidade de itens conforme coleção._
```PHP
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
return $collect->take(5);
return $collect->take(-5);

//Saida
[1,2,3,4,5]
[6,7,8,9,10]
```
___

_`transform` - transformar cada item da coleção usando um callback._
```PHP
$collect = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);       
$collect->transform(function($a)
{
    return [$a + 1];
});

//Saida
[[2],[3],[4],[5],[6],[7],[8],[9],[10],[11]]
```
____

_`unique()` - retornar somente os valores únicos em um determinada coleção_
```PHP
$collect = collect(['roma','pera','roma']);
var_dump($collect->unique()->toArray());

//Saida
array(2) { [0]=> string(4) "roma" [1]=> string(4) "pera"}
```
____

_`values()` - remove as chaves e retornar somente os valores da coleção_
```PHP
$collect = collect(['fruta1' => 'roma','fruta2' =>'pera','fruta3'=>'roma']);
var_dump($collect->all());
var_dump($collect->values());

//Saida
array(3) { ["fruta1"]=> string(4) "roma" ["fruta2"]=> string(4) "pera" ["fruta3"]=> string(4) "roma"}
array(3) { [0]=> string(4) "roma" [1]=> string(4) "pera" [2]=> string(4) "roma"}
```
___

_`toArray()`- saída da coleção no formato `array`_ 
```PHP
$collect = collect(['fruta1' => 'roma','fruta2' =>'pera','fruta3'=>'roma']);        
var_dump($collect->toArray());

//Saida
array(3) { ["fruta1"]=> string(4) "roma" ["fruta2"]=> string(4) "pera" ["fruta3"]=> string(4) "roma" }
```
___

_`jsonSerialize()`- converte o objeto em JSON serializado_ 
```PHP
$collect = collect(['fruta1' => 'roma','fruta2' =>'pera','fruta3'=>'roma']);        
var_dump($collect->jsonSerialize());

//Saida
array(3) { ["fruta1"]=> string(4) "roma" ["fruta2"]=> string(4) "pera" ["fruta3"]=> string(4) "roma" }
```
____

_`toJson()`- saída da coleção no formato `JSON`_ 
```PHP
$collect = collect(['fruta1' => 'roma','fruta2' =>'pera','fruta3'=>'roma']);        
var_dump($collect->toJson());

//Saida
string(49) "{"fruta1":"roma","fruta2":"pera","fruta3":"roma"}"
```
___

_`getIterator()`- retornar um `ArrayIterator` _
```PHP
$collect  = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
$iterator = $collect->getIterator();
while ($iterator->valid())
{
    echo $iterator->current() . '<br>';
    $iterator->next();
}

//Saida
1
2
3
4
5
6
7
8
9
10
```
___ 

_`getCachingIterator`- retornar um `CachingIterator`_
```PHP
$collect  = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
$iterator = $collect->getCachingIterator(\CachingIterator::FULL_CACHE);
while ($iterator->getInnerIterator()->valid())
{
    echo $iterator->current() . '<br>';
    $iterator->next();
}

//Saida
1
2
3
4
5
6
7
8
9
10
```

____

_`count()`- conta o número de itens de uma coleção_
```PHP
$collect  = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
return $collect->count();

//Saida
10

///ou

$collect = collect([
                ['fruta'=>'maça', 'tempero'=>'pimenta'],
                ['eletronico'=>'computador']
            ]
        );
return $collect->count();

//Saida
2
```
____
##Referências: 

- [Collection API](http://laravel.com/api/master/Illuminate/Support/Collection.html)
    
- [Collection](http://laravel.com/docs/5.0/collections)
