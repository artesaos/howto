# Eloquent

## Relacionamentos Muitos para Muitos com Tabela de Estrutura de Relacionamento

Esse tipo de estruturação é indicado quando várias tabelas são associadas a um delas de modo especial. Na imagem abaixo a tabela `tags` se associa com as tabelas `comments` e `noticies` de modo a `tag` de `id = 1` pode estar em `comments` e `noticies` ao mesmo tempo. Para isso é criado uma tabela que simboliza a relação mais o tipo da relação.

![1 para 1](https://github.com/diasfulvio/howto/blob/master/images/N-M-Morph.png)

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

```
###Alterar

_Alterar tabela muitos para muitos não é usual, só altera mesmo as tabelas de `Authors` e `Books`_

###Excluir
```PHP

```

###Listar
```PHP

```


##Referências: 

- [Eloquent Many To Many](http://laravel.com/docs/5.0/eloquent#many-to-many)
    
- [Eloquent Relationships](http://laravel.com/docs/5.0/eloquent#relationships)

