using Contracts;
using Entities;
using Repository;
using ViewModel.AutoMapper;

var builder = WebApplication.CreateBuilder(args);
string ploicy = "_ploicy ";

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(MapperProfiles).Assembly);

builder.Services.AddDbContext<CompanyContext>();
builder.Services.AddScoped<IRepositoryWrapper, RepositoryWrapper>();
builder.Services.AddCors(Options => Options.AddPolicy(ploicy, builder => {
    builder.AllowAnyOrigin();
    builder.AllowAnyHeader();
    builder.AllowAnyMethod();
}));

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseCors(ploicy);
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
