# Eloquent

## Relacionamentos 1 para Muitos

A relação de `1 para N` que existe entre as tabelas de nomes `peoples` e `phones`, conforme demostrado figura abaixo:

![1 para 1](https://github.com/diasfulvio/how-to-laravel/blob/gh-pages/images/1-N.png)

Ou seja, 1 pessoa possui nenhum ou vários telefones e um telefone é de uma pessoa.

Para refletir isso no Laravel crie as seguintes classes que herdam do Eloquent (Model).

__Peoples__

```PHP
<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Peoples extends Model
{
    //Nome da tabela.
    protected $table      = 'peoples';
    
    //Primary Key da Tabela.
    protected $primaryKey = 'id';
    
    //Item em um Array que são utilizados para preenchimento da informação.
    protected $fillable   = ['name'];
    
    //Deseja trabalhar ou não com campos created_at e updated_at do tipo timestamp nessa tabela.
    public  $timestamps   = false;

    //Relacionamento
    public function phones()
    {
        //     $this->hasMany(relação, chave estrangeira da relação, primary key local);
        return $this->hasMany('App\Phones', 'peopleid', 'id');
    }
    
}
```

__Phones__

```PHP
<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Phones extends Model
{
    //Nome da tabela.
    protected $table      = 'phones';
    
    //Primary Key da Tabela.
    protected $primaryKey = 'id';
    
    //Item em um Array que são utilizados para preenchimento da informação.
    protected $fillable   = ['ddd', 'number'];
    
    //Deseja trabalhar ou não com campos created_at e updated_at do tipo timestamp nessa tabela.
    public  $timestamps   = false;

    //Relacionamento
    public function people()
    {
        //     $this->belongsTo(relação, chave estrangeira local, primary key da relação);
        return $this->belongsTo('App\Peoples', 'peopleid', 'id');
    }
}
```

##Codificando

###Inserir
```PHP
//criando pessoas e logo após criando dois telefones para essa pessoa.
$p = Peoples::create(['name' => 'telefone']);
$p->phones()->create(['ddd'=>'333', 'number' => '123456']);
$p->phones()->create(['ddd'=>'444', 'number' => '123456']);
        
```
###Alterar
```PHP
//Alterar pessoas
$p = Peoples::find(6);
$p->name = 'name 6';
$p->save();

//Alterar telefones
$t = Phones::find(1);
$t->ddd = '222';
$t->number = '6669999';
$t->save();

ou

//Alterando todos os telefones da pessoa de id = 6;
Peoples::find(6)->phones->each(function($phone)
{
    $phone->ddd = '666 a';
    $phone->save();
});

```

###Excluir
```PHP
//Excluindo telefones da pessoa de id = 6 inclusive a pessoa.
$p = Peoples::find(6);
if ($p)
{
    $p->phones->each(function($phone) {
        $phone->delete();
    });
    $p->delete();
}

```


##Referências: 

- [Eloquent One To Many](http://laravel.com/docs/5.0/eloquent#one-to-many)
    
- [Eloquent Relationships](http://laravel.com/docs/5.0/eloquent#relationships)
