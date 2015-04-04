---
layout: post
title: Collections L5
categories: Helpers L5
author: @diasfulvio
author_url: https://github.com/diasfulvio
---

A Classe `Illuminate\Support\Collection` é um wrapper muito conveniente quando de trabalha com uma lista de dados (array).  
As collections ou coleções são amplamente usadas no Laravel.

```php
// Namespace
use Illuminate\Support\Collection;

$collectionion = new Collection([1, 2, 3, 4, 5, 6, 7, 8, 10]);

// Facade
$collectionion = Collection::make([1, 2, 3, 4, 5, 6, 7, 8, 10]);

// Helper
$collectionion = collect([1, 2, 3, 4, 5, 6, 7, 8, 10]);
```  

## Metodos

### all()

> Retorna todos os itens da coleção, o array original.

```php
$collection->all();

# Saída

# [1,2,3,4,5,6,7,8,10];
```
___

### collapse

> Transforma os itens da coleção em uma único array.

```php
$collection = collect([
                    ['fruta'=>'maça', 'tempero'=>'pimenta'], 
                    ['eletronico'=>'computador']
                   ]
                  );
                  
return $collection->collapse();
 
# Saída

# {"fruta":"maça","tempero":"pimenta","eletronico":"computador"}

```
___

### contains

> Verifica se existe o valor dentro de uma coleção se sim retorna `true` se não retorna `false`

```php
// Array Simples
$collection = collect(['fruta'=>'maça', 'tempero'=>'pimenta']);

var_dump($collection->contains('maça'));
var_dump($collection->contains('fruta'));

# Saída

# bool(true)
# bool(false)

///ou 

// Array Bidimensional
$collection = collect([['fruta'=>'maça', 'tempero'=>'pimenta'], ['pagamento'=>'luz']]);

var_dump($collection->contains('pagamento', 'luz'));
var_dump($collection->contains('maça', 'fruta'));

# Saída

# bool(true)
# bool(false)

```
___

### diff

> Retornar um array fazendo a comparação da diferença entre eles, os que forem diferente ele retorna

```php
$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

$diff = $collection->diff([11,12,13,14,15,16,17,18,19,20]);

var_dump($diff);

# Saída

[1,2,3,4,5,6,7,8,9,10];

// ou 

$collection = collect([1, 2, 3]);

$diff = $collection->diff([1, 2]);

var_dump($diff);

# Saída

# {"2":3} // aonde o número 3 é a diferença entres as coleções.
```
___

### each

> executa uma `function` sobre cada item, ele vai retornar ele mesmo, a função principal é interagir em cada posição e utilizar da melhor maneira fazendo alterações em um lista de informações por exemplo:


```php
// Array Simples
$collection = collect([1, 2, 3]);
$newCollection = $collection->each(function($i) { return $i*2; });

//Saida
[2, 4, 6]

/// ou

// Array Bidimensioanl

$collection = collect([[1, 2, 3],[4, 5, 6]]);
echo $collection->collapse()->each(function($item) {
    return $item;
});

// Saida
[1, 2, 3, 4, 5, 6]

## Observação eu fiz uma união dos arrays dessa coleção para ficar mais fácil a execução da função em cada item.
```

___

### fetch

> Busca pela posição o elemento em um array bidimensional._

```php
$collection = collect([[1, 2, 3, 4, 5, 6],[4,5,6],[0]]);

var_dump($collection->fetch(2));

//Saida
# object(Illuminate\Support\Collection)#174 (1) { 
#    ["items":protected]=> array(2) { [0]=> int(3) [1]=> int(6) } 
# }

///ou 

var_dump($collection->fetch(2)->toArray());

//Saida
# array(2) { [0]=> int(3) [1]=> int(6) }
```
___

### filter 

> faz um filtro em sua coleção e retorna um outra coleção os dados que passaram pelo filtro

```php
$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

$result = $collection->filter(function($item){
    return ($item % 2 === 0);
});

// Saida (somente os números pares)

# {"1": 2,"3": 4,"5": 6,"7": 8,"9": 10}
```
___

### forPage

> Paginação dos resultados

```php
$collection = collect(
            [
                ['id' => 1, 'status' => 1, 'nome' => 'nome 1'],
                ['id' => 2, 'status' => 0, 'nome' => 'nome 2'],
                ['id' => 3, 'status' => 1, 'nome' => 'nome 3'],
                ['id' => 4, 'status' => 1, 'nome' => 'nome 4'],
                ['id' => 5, 'status' => 1, 'nome' => 'nome 5']
            ]
        );
var_dump($collection->forPage(0,3));

//Saida
# object(Illuminate\Support\Collection)#174 (1) { 
#  ["items":protected]=> array(3) { 
#    [0]=> array(3) { ["id"]=> int(3) ["status"]=> int(1) ["nome"]=> string(6) "nome 3" } 
#    [1]=> array(3) { ["id"]=> int(4) ["status"]=> int(1) ["nome"]=> string(6) "nome 4" } 
#    [2]=> array(3) { ["id"]=> int(5) ["status"]=> int(1) ["nome"]=> string(6) "nome 5" } 
#    } 
# }
```
___

### where ou whereLoose 

> faz um filtro de valor em um par de chaves informadas.

```php
$collection = collect([
                      ['fruta'=>'maça'],
                      ['fruta'=>'laranja'],
                      ['fruta'=>'abacate']
                    ]);

$result = $collection->where('fruta','laranja');
 
# Saída

# {"1":{"fruta":"laranja"}}
```
___

### first

> Pega o primeiro item da coleção ou o primeiro item conforme alguma condição.

```php
# Primeiro item da lista
$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

return $collection->first();

//Saida
# 1

///ou

# Primeiro item da lista conforme decisão pela chave.

$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

return $collection->first(function($key, $value)
      {
       return $key > 0;
      });

// Saida
2

///ou 

# Primeiro item da lista conforme decisão pelo valor.

$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
return $collection->first(function($key, $value)
{
 return $value > 5;
});

//Saida
#6

```
____

### flatten

> Pega uma matriz coleção.

```php
$collection = collect([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],[12,13],1,50,60,[15,25,26]]);

return $collection->flatten();

//Saida
# [1,2,3,4,5,6,7,8,9,10,12,13,1,50,60,15,25,26]
```
____

### flip
> Trocar chave por valor e valor por chave de uma coleção.

```php
$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

var_dump($collection->all());
var_dump($collection->flip());

//Saida
// [1,2,3,4,5,6,7,8,9,10]
// {"1":0,"2":1,"3":2,"4":3,"5":4,"6":5,"7":6,"8":7,"9":8,"10":9}

///ou

$collection = collect(['fruta 1' => 'maça', 'fruta 2' => 'laranja']);
var_dump($collection->all());
var_dump($collection->flip());

//Saida
// {"fruta 1":"maça","fruta 2":"laranja"}
// {"maça":"fruta 1","laranja":"fruta 2"}

```
____

### forget 
> Remove item de uma coleção pela sua chave.

```php
$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);        
$collection->forget(1);

// Saida (o número dois que pertencia a chave 1 foi removido)
// {"0":1,"2":3,"3":4,"4":5,"5":6,"6":7,"7":8,"8":9,"9":10}

/// ou

$collection = collect(['fruta 1' => 'maça', 'fruta 2' => 'laranja']);
$collection->forget('fruta 1');

//Saida
# {"fruta 2":"laranja"}
```
____

### get
> Resgatar o valor sendo a busca feita pela chave.

```php
$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var_dump($collection->get(0));

//Saida
# 1

///ou

$collection = collect(['fruta 1' => 'maça', 'fruta 2' => 'laranja']);
var_dump($collection->get('fruta 1'));

//Saida
# maça
```
____

### groupBy
> Agrupando uma coleção mediante pesquisa feita em uma determinada chave.

```php
$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var_dump($collection->groupBy(function($n){ return $n % 2 === 0;});

//Saida (agrupamento realizado dos valores impares em um coleção e pares em outra)
# [[1,3,5,7,9],[2,4,6,8,10]]

///ou

$collection = collect(
    [
        ['id' => 1, 'status' => 1, 'nome' => 'nome 1'],
        ['id' => 2, 'status' => 0, 'nome' => 'nome 2'],
        ['id' => 3, 'status' => 1, 'nome' => 'nome 3'],
        ['id' => 4, 'status' => 1, 'nome' => 'nome 4']
    ]
);
var_dump( $collection->groupBy(function($n){ return $n['status'] === 1; }));

//Saida
# {
#  "1":[
#       {"id":1,"status":1,"nome":"nome 1"},
#       {"id":3,"status":1,"nome":"nome 3"},
#       {"id":4,"status":1,"nome":"nome 4"}
#      ],
#  "0":[
#       {"id":2,"status":0,"nome":"nome 2"}
#      ]
# }
```
___

### keyBy [WIP]

___

### has

> Determina se o item existente na coleção por um chave.

```php
$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var_dump($collection->has(9));

//Saida
# bool(true)

///ou

$collection = collect(['id' => 1, 'status' => 1, 'nome' => 'nome 1']);
var_dump($collection->has('id'));

//Saida
# bool(true)
```
____

### implode

> Concatenar valores de uma determinada chave como uma string._

```php
$collection = collect(
            [
                ['id' => 1, 'status' => 1, 'nome' => 'nome 1'],
                ['id' => 2, 'status' => 0, 'nome' => 'nome 2'],
                ['id' => 3, 'status' => 1, 'nome' => 'nome 3'],
                ['id' => 4, 'status' => 1, 'nome' => 'nome 4']
            ]
        );
var_dump($collection->implode('id', '-'));

//Saida
# string(7) "1-2-3-4"
```        

### intersect 

> intersecção a coleção com os objetos disponíveis.

```php
  // @TODO
```


#### isEmpty()

> Função que verifica se não existe itens na coleção

```php
$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var_dump($collection->isEmpty());

//Saida
#bool(false)

///ou

$collection = collect([]);
var_dump($collection->isEmpty());

//Saida
# bool(true)
```
___ 

_`keys()` - retornar todas as chaves de uma coleção_
```php
$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
var_dump($collection->keys());

//Saida
// array(10) { [0]=> int(0) [1]=> int(1) [2]=> int(2) [3]=> int(3) [4]=> int(4) 
//             [5]=> int(5) [6]=> int(6) [7]=> int(7) [8]=> int(8) [9]=> int(9)
//          }
         
/// ou

$collection = collect(['id' => 1, 'status' => 1, 'nome' => 'nome 1']);

var_dump($collection->keys());

//Saida
// array(3) {[0]=> string(2) "id" [1]=> string(6) "status" [2]=> string(4) "nome" }
```
____

### last() 

> Retornaro último item de um array

```php
$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 10]);
var_dump($collection->last());

// Saida
# 10
```
___
 
### lists
> Obter um coleção com os valores de uma chave.

```php
$collection = collect(
            [
                ['id' => 1, 'status' => 1, 'nome' => 'nome 1'],
                ['id' => 2, 'status' => 0, 'nome' => 'nome 2'],
                ['id' => 3, 'status' => 1, 'nome' => 'nome 3'],
                ['id' => 4, 'status' => 1, 'nome' => 'nome 4']
            ]
        );
var_dump($collection->lists('nome', 'id'));

//Saida
// array(4) { [1]=> string(6) "nome 1" 
//            [2]=> string(6) "nome 2" 
//            [3]=> string(6) "nome 3" 
//            [4]=> string(6) "nome 4" 
//          }
```
___

### map 

> Executar um mapa sobre cada um dos itens.

```php
$collection = collect(
            [
                ['id' => 1, 'status' => 1, 'nome' => 'nome 1'],
                ['id' => 2, 'status' => 0, 'nome' => 'nome 2'],
                ['id' => 3, 'status' => 1, 'nome' => 'nome 3'],
                ['id' => 4, 'status' => 1, 'nome' => 'nome 4']
            ]
        );
var_dump($collection->map(function($item){
    $item['status'] = ($item['status'] === 1);
    return $item;
})->all());

//Saida
// array(4) { 
//    [0]=> array(3) { ["id"]=> int(1) ["status"]=> bool(true) ["nome"]=> string(6) "nome 1" } 
//    [1]=> array(3) { ["id"]=> int(2) ["status"]=> bool(false) ["nome"]=> string(6) "nome 2" } 
//    [2]=> array(3) { ["id"]=> int(3) ["status"]=> bool(true) ["nome"]=> string(6) "nome 3" } 
//    [3]=> array(3) { ["id"]=> int(4) ["status"]=> bool(true) ["nome"]=> string(6) "nome 4" } 
// }
```
___

### merge

> Adicionar na atual coleção valores informados.

```php
$collection = collect(
            [
                ['id' => 1, 'status' => 1, 'nome' => 'nome 1'],
                ['id' => 2, 'status' => 0, 'nome' => 'nome 2'],
                ['id' => 3, 'status' => 1, 'nome' => 'nome 3'],
                ['id' => 4, 'status' => 1, 'nome' => 'nome 4']
            ]
        );
var_dump($collection->merge([['id' => 5, 'status' => 1, 'nome' => 'nome 5']])->toArray());

//Saida
// array(5) { 
//     [0]=> array(3) { ["id"]=> int(1) ["status"]=> int(1) ["nome"]=> string(6) "nome 1" } 
//     [1]=> array(3) { ["id"]=> int(2) ["status"]=> int(0) ["nome"]=> string(6) "nome 2" } 
//     [2]=> array(3) { ["id"]=> int(3) ["status"]=> int(1) ["nome"]=> string(6) "nome 3" } 
//     [3]=> array(3) { ["id"]=> int(4) ["status"]=> int(1) ["nome"]=> string(6) "nome 4" } 
//     [4]=> array(3) { ["id"]=> int(5) ["status"]=> int(1) ["nome"]=> string(6) "nome 5" } 
// }
```

____

### pop()
> Recupera e exclui o último valor da coleção.

```php
$collection = collect(
            [
                ['id' => 1, 'status' => 1, 'nome' => 'nome 1'],
                ['id' => 2, 'status' => 0, 'nome' => 'nome 2'],
                ['id' => 3, 'status' => 1, 'nome' => 'nome 3'],
                ['id' => 4, 'status' => 1, 'nome' => 'nome 4'],
                ['id' => 5, 'status' => 1, 'nome' => 'nome 5']
            ]
        );
var_dump($collection->pop());
var_dump($collection->all());

//Saida
# array(3) { ["id"]=> int(5) ["status"]=> int(1) ["nome"]=> string(6) "nome 5" } 
 
# array(4) { 
#    [0]=> array(3) { ["id"]=> int(1) ["status"]=> int(1) ["nome"]=> string(6) "nome 1" } 
#    [1]=> array(3) { ["id"]=> int(2) ["status"]=> int(0) ["nome"]=> string(6) "nome 2" } 
#    [2]=> array(3) { ["id"]=> int(3) ["status"]=> int(1) ["nome"]=> string(6) "nome 3" } 
#    [3]=> array(3) { ["id"]=> int(4) ["status"]=> int(1) ["nome"]=> string(6) "nome 4" } 
# }
```
____
### prepend
> Empurre um item para o início da coleção.

```php
$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
$collection->prepend(10);

var_dump($collection->all());

//Saida
# array(11) { 
#    [0]=> int(10) 
#    [1]=> int(1) 
#    [2]=> int(2) 
#    [3]=> int(3) 
#    [4]=> int(4) 
#    [5]=> int(5) 
#    [6]=> int(6) 
#    [7]=> int(7) 
#    [8]=> int(8) 
#    [9]=> int(9) 
#    [10]=> int(10) 
# }
```
___

### push

> Empurre um item para o final da coleção.

```php
$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
$collection->push(1);

var_dump($collection->all());

//Saida
# array(11) { 
#    [0]=> int(1) 
#    [1]=> int(2) 
#    [2]=> int(3) 
#    [3]=> int(4) 
#    [4]=> int(5) 
#    [5]=> int(6) 
#    [6]=> int(7) 
#    [7]=> int(8) 
#    [8]=> int(9) 
#    [9]=> int(10) 
#    [10]=> int(1) 
# }
```
___ 

### pull

> Remove um item da coleção pela sua chave._

```php
$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
$collection->pull(1);

var_dump($collection->all());

//Saida
# array(9) { 
#    [0]=> int(1) 
#    [2]=> int(3) 
#    [3]=> int(4) 
#    [4]=> int(5) 
#    [5]=> int(6) 
#    [6]=> int(7) 
#    [7]=> int(8) 
#    [8]=> int(9) 
#    [9]=> int(10) 
# }
```

___

### put 
> coloque um item na coleção por chave se exister o item é sobreescrito.

```php
$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
$collection->put(0,100);

var_dump($collection->all());
        
//Saida
# array(10) { 
#    [0]=> int(100) 
#    [1]=> int(2) 
#    [2]=> int(3) 
#    [3]=> int(4) 
#    [4]=> int(5) 
#    [5]=> int(6) 
#    [6]=> int(7) 
#    [7]=> int(8) 
#    [8]=> int(9) 
#    [9]=> int(10) 
# }
```
___

_`random` - obter um ou mais itens aleatoriamente a partir da coleção._
```php
$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

var_dump($collection->random());
var_dump($collection->random());
var_dump($collection->random());

//Saida
# int(6) 
# int(3) 
# int(1)

/// ou

$collection = collect(['fruta 1' => 'maça', 'fruta 2' => 'laranja']);

var_dump($collection->random());
var_dump($collection->random());
var_dump($collection->random());

//Saida
# string(7) "laranja" 
# string(7) "laranja" 
# string(5) "maça"
```
___

### reduce

> Reduzir a coleção para um único valor.

```php
$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

var_dump($collection->reduce(function ($a,$b){
    return $a + $b;
}));

//Saida
# int(55)
```
____

### reject

>Criar uma coleção de todos os elementos que não passam um determinado teste verdade.

```php
$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

var_dump($collection->reject(function ($a){
    return ($a % 2 !== 0);
})->toArray());

//Saida

# array(5) { 
#    [1]=> int(2) 
#    [3]=> int(4) 
#    [5]=> int(6) 
#    [7]=> int(8) 
#    [9]=> int(10) 
# }
```
____

### reverse()
> Itens da coleção em ordem inversa.

```php
$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

var_dump($collection->reverse()->toArray());
 
//Saida
# array(10) {
#    [0]=> int(10) 
#    [1]=> int(9) 
#    [2]=> int(8) 
#    [3]=> int(7) 
#    [4]=> int(6) 
#    [5]=> int(5) 
#    [6]=> int(4) 
#    [7]=> int(3) 
#    [8]=> int(2) 
#    [9]=> int(1) 
# }
```
___ 

### search

> Pesquisar a coleção para um dado valor e retornar a chave correspondente caso seja encontrado.

```php
$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

var_dump($collection->search(3));

//Saida
# int(2)
```
____
### shift()

> obter e remover o primeiro item da coleção.

```php
$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

var_dump($collection->shift());

//Saida
# int(1)
```
___

### shuffle()

> Embaralhar os itens da coleção.

```php
$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

var_dump($collection->shuffle());

//Saida
# array(10) { 
#    [0]=> int(6) 
#    [1]=> int(9) 
#    [2]=> int(8) 
#    [3]=> int(7) 
#    [4]=> int(3) 
#    [5]=> int(4) 
#    [6]=> int(2) 
#    [7]=> int(5) 
#    [8]=> int(1) 
#    [9]=> int(10) 
# }
```
___

### slice

> Fatie a matriz coleção subjacente, ou, pega partes informando o inicio e o fim chave.

```php
$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

var_dump($collection->slice(3,3, false)->toArray());

//Saida
# array(3) { 
#  [0]=> int(4) 
#  [1]=> int(5) 
#  [2]=> int(6) 
# }
```
___

### chunk

> Divide o array em partes conforme quantidade de itens até o fim da coleção.

```php
$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

var_dump($collection->chunk(3, false)->toArray());

//Saida
# array(4) {
#   [0]=> array(3) {[0]=> int(1) [1]=> int(2) [2]=> int(3) }
#   [1]=> array(3) {[0]=> int(4) [1]=> int(5) [2]=> int(6) }
#   [2]=> array(3) {[0]=> int(7) [1]=> int(8) [2]=> int(9) }
#   [3]=> array(1) {[0]=> int(10) }
# }
```
____

### sort

> Ordenar por cada item conforme a `function`.

```php
$collection = collect(['d' => 2, 'a' => 1, 'z' => 0]);

return $collection->sort(function($a, $b){
    return $a == $b ? 0: ($a > $b ? 1 : -1);
})->toArray();

//Saida
# { "z": 0, "a": 1, "d": 2}
```
____
### sortBy

> Ordenar por cada item conforme a `function`.

```php
return $collection->sortBy(function($a) {
    return $a;
}, SORT_REGULAR, false)->toArray();

//Saida

# {"z":0,"a":1,"d":2}
```
____

### sortByDesc

> apelido do `sortBy` já ordenando para descendente conforme a `function`.

```php
return $collection->sortByDesc(function($a) {
    return $a;
}, SORT_REGULAR)->toArray();

//Saida
# {"d":2,"a":1,"z":0}
```
____

### splice

> Retornar partes da coleção.

```php
$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

return $collection->splice(5,1);

//Saida
# {6}
```
___

### sum
> Retornar a soma dos elementos.

```php
$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

return $collection->sum();

//Saida

#55

///ou

$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

return $collection->sum(function($a){
    if ($a > 5)
    {
        return $a;
    }
    return 0;
});

//Saida
# 40
```
___

### take

> Quantidade de itens conforme coleção.

```php
$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

return $collection->take(5);

return $collection->take(-5);

// Saida
// [1,2,3,4,5]
// [6,7,8,9,10]
```
___

### transform

> Transformar cada item da coleção usando um callback.

```php
$collection = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);       
$collection->transform(function($a)
{
    return [$a + 1];
});

// Saida
// [[2],[3],[4],[5],[6],[7],[8],[9],[10],[11]]
```
____

### unique

> Retornar somente os valores únicos em um determinada coleção.

```php
$collection = collect(['roma','pera','roma']);

var_dump($collection->unique()->toArray());

// Saida
// array(2) { [0]=> string(4) "roma" [1]=> string(4) "pera"}
```
____

### values()

> Remove as chaves e retornar somente os valores da coleção.

```php
$collection = collect(['fruta1' => 'roma','fruta2' =>'pera','fruta3'=>'roma']);

var_dump($collection->all());
var_dump($collection->values());

// Saida
// array(3) { ["fruta1"]=> string(4) "roma" ["fruta2"]=> string(4) "pera" ["fruta3"]=> string(4) "roma"}
// array(3) { [0]=> string(4) "roma" [1]=> string(4) "pera" [2]=> string(4) "roma"}
```
___

### toArray()

> Saída da coleção no formato `array`

```php
$collection = collect(['fruta1' => 'roma','fruta2' =>'pera','fruta3'=>'roma']);        

var_dump($collection->toArray());

// Saida
// array(3) { ["fruta1"]=> string(4) "roma" ["fruta2"]=> string(4) "pera" ["fruta3"]=> string(4) "roma" }
```
___

### jsonSerialize

> Converte o objeto em JSON serializado.

```php
$collection = collect(['fruta1' => 'roma','fruta2' =>'pera','fruta3'=>'roma']);        

var_dump($collection->jsonSerialize());

// Saida
// array(3) { ["fruta1"]=> string(4) "roma" ["fruta2"]=> string(4) "pera" ["fruta3"]=> string(4) "roma" }
```
____

### toJson

> Saída da coleção no formato `JSON`.

```php
$collection = collect(['fruta1' => 'roma','fruta2' =>'pera','fruta3'=>'roma']);        

var_dump($collection->toJson());

//Saida
// string(49) "{"fruta1":"roma","fruta2":"pera","fruta3":"roma"}"
```
___

### getIterator()`- retornar um `ArrayIterator`

```php
$collection  = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

$iterator = $collection->getIterator();

while ($iterator->valid())
{
    echo $iterator->current() . '<br>';
    $iterator->next();
}

//Saida
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
```
___ 

### getCachingIterator

> Retornar um `CachingIterator`

```php
$collection  = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

$iterator = $collection->getCachingIterator(\CachingIterator::FULL_CACHE);

while ($iterator->getInnerIterator()->valid())
{
    echo $iterator->current() . '<br>';
    $iterator->next();
}

// Saida
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
```

____

### count()

> Conta o número de itens de uma coleção

```php
$collection  = collect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

return $collection->count();

// Saida
// 10

///ou

$collection = collect([
                ['fruta'=>'maça', 'tempero'=>'pimenta'],
                ['eletronico'=>'computador']
            ]
        );
        
return $collection->count();

// Saida
2
```
____
##Referências: 

- [Collection API](http://laravel.com/api/master/Illuminate/Support/Collection.html)
    
- [Collection](http://laravel.com/docs/5.0/collections)
