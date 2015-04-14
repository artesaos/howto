# Eloquent

## Relacionamentos Muitos para Muitos com Tabela de Estrutura de Relacionamento

Esse tipo de estruturação é indicado quando várias tabelas são associadas a um delas de modo especial. Na imagem abaixo a tabela `tags` se associa com as tabelas `comments` e `notices` de modo a `tag` de `id = 1` pode estar em `comments` e `noticies` ao mesmo tempo. Para isso é criado uma tabela que simboliza a relação entre todas elas fazendo um centralizador das relações que podem possuir também `tags` de `comments` como `tags` de `notices` e assim por diante.

![1 para N](https://github.com/diasfulvio/howto/blob/master/images/N-M-Morph.png)

Para refletir isso no Laravel crie as seguintes classes que herdam do Eloquent (Model).

__Notices__

```PHP
<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Notice extends Model
{
    //Nome da tabela.
    protected $table      = 'notices';
    
    //Primary Key da Tabela.
    protected $primaryKey = 'id';
    
    //Item em um Array que são utilizados para preenchimento da informação.
    protected $fillable   = array('title');
    
    //Deseja trabalhar ou não com campos created_at e updated_at do tipo timestamp nessa tabela.
    public  $timestamps   = false;

    //Relacionamento.
    public function tags()
    {
             //$this->morphToMany('relação', 'name', 'nome da tabela', 'foreign key', 'local key')
        return $this->morphToMany('App\Tag', 'taggable', 'taggables', 'taggableid', 'tagid');
    }
}
```

__Comments__

```PHP
<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    //Nome da tabela.
    protected $table      = 'comments';
    
    //Primary Key da Tabela.
    protected $primaryKey = 'id';
    
    //Item em um Array que são utilizados para preenchimento da informação.
    protected $fillable   = array('title', 'text');
    
    //Deseja trabalhar ou não com campos created_at e updated_at do tipo timestamp nessa tabela.
    public  $timestamps   = false;

    //Relacionamento.
    public function tags()
    {
             //$this->morphToMany('relação', 'name', 'nome da tabela', 'foreign key', 'local key')
        return $this->morphToMany('App\Tag', 'taggable', 'taggables', 'taggableid', 'tagid');
    }
}
```

__Tags__

```PHP
<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    //Nome da tabela.
    protected $table      = 'tags';
    
    //Primary Key da Tabela.
    protected $primaryKey = 'id';
    
    //Item em um Array que são utilizados para preenchimento da informação.
    protected $fillable   = array('description');
    
    //Deseja trabalhar ou não com campos created_at e updated_at do tipo timestamp nessa tabela.
    public  $timestamps   = false;

    //Relacionamento.
    public function comments()
    {
        return $this->morphedByMany("App\Comment", 'taggable', 'taggables','tagid','taggableid');
    }

    //Relacionamento.
    public function notices()
    {
        return $this->morphedByMany("App\Notice", 'taggable', 'taggables','tagid','taggableid');
    }
}
```
Nessa `class Tag` tem o relacionamento de volta, ou seja, conseguimos pegar pela `tag` as `notices` e/ou `comments` que estão relacionados na tabela `taggables`.

##Codificando

###Inserir
```PHP
$comment = Comment::find(1);
$notice  = Notice::find(1);
$tag     = Tag::find(1);

$comment->tags()->attach($tag);
$notice->tags()->attach($tag);
```
Depois desses comandos que são igualzinhos do Relacionamento N-M os dados da tabela ficariam assim:

![1 para 1](https://github.com/diasfulvio/howto/blob/master/images/N-M-MorphInsert.png)

Ou seja, existe um campo para diferenciação (`taggable_type`) simbolizando que aquele registro pertence a uma determinada tabela.

###Alterar

_Alterar tabela muitos para muitos não é usual, só altera mesmo as tabelas de `comments`,`tags`, `notices`_

###Excluir
```PHP
$comment = Comment::find(1);
$notice  = Notice::find(1);
$tag     = Tag::find(1);

$comment->tags()->detach($tag);
$notice->tags()->detach($tag);
```
Para excluir é bem parecido com o inserir só muda o método de `attach` para `detach`

###Listar
```PHP
$comment = Comment::with('tags')->find(1);
return $comment;

//Saída
{
    "id": 1,
    "title": "title 1",
    "text": "text1",
    "tags": [
        {
            "id": 1,
            "description": "Programação",
            "pivot": {
                "taggableid": 1,
                "tagid": 1
            }
        }
    ]
}

_____________________________________________________________________________________________________________________

$notice  = Notice::with('tags')->find(1);
return $notice;

//Saída
{
    "id": 1,
    "title": "titulo 1",
    "tags": [
        {
            "id": 1,
            "description": "Programação",
            "pivot": {
                "taggableid": 1,
                "tagid": 1
            }
        }
    ]
}

_____________________________________________________________________________________________________________________

$tag   = Tag::with(['notices','comments'])->find(1);
return $tag;

//Saída
{
    "id": 1,
    "description": "Programação",
    "notices": [
        {
            "id": 1,
            "title": "titulo 1",
            "pivot": {
                "tagid": 1,
                "taggableid": 1
            }
        }
    ],
    "comments": [
        {
            "id": 1,
            "title": "title 1",
            "text": "text1",
            "pivot": {
                "tagid": 1,
                "taggableid": 1
            }
        }
    ]
}

```


##Referências: 

- [Eloquent Many To Many](http://laravel.com/docs/5.0/eloquent#many-to-many)
    
- [Eloquent Relationships](http://laravel.com/docs/5.0/eloquent#relationships)

