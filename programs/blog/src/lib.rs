use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

declare_id!("9ZXF31HfNPdhenwQ8kMZQrEdzrEcSKiLg4qFKFgbpV8z");

#[program]
pub mod blog {
    use super::*;
    pub fn init_blog(ctx: Context<InitBlog>) -> ProgramResult {
        let blog = &mut ctx.accounts.blog;
        let first_post = &mut ctx.accounts.first_post;
        let authority = &mut ctx.accounts.authority;

        blog.authority = authority.key();
        blog.last_post_id = first_post.key();
        Ok(())
    }

    pub fn sign_up_user(ctx: Context<SigUpUser>, name: String) -> ProgramResult {
        let user = &mut ctx.accounts.user;
        let authority = &mut ctx.accounts.authority;

        user.authority = authority.key();
        user.name = name;
        Ok(())
    }

    pub fn create_post(ctx: Context<CreatePost>, title: String) -> ProgramResult {
        let post = &mut ctx.accounts.post;
        let user = &mut ctx.accounts.user;
        let blog = &mut ctx.accounts.blog;
        let authority = &mut ctx.accounts.authority;

        post.title = title;
        post.user = user.key();
        post.pre_post_id = blog.last_post_id;
        post.authority = authority.key();
        blog.last_post_id = post.key();
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitBlog<'info> {
    #[account(init, payer = authority, space = 8 + 32 + 32 + 32)]
    pub blog: Account<'info, BlogState>,
    #[account(init, payer = authority, space = 8 + 32 + 32 + 32 + 300)]
    pub first_post: Account<'info, PostState>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct CreatePost<'info> {
    #[account(init, payer = authority, space = 8 + 50 + 500 + 32 + 32 + 32 + 32 + 32 + 32)]
    pub post: Account<'info, PostState>,
    #[account(mut, has_one = authority)]
    pub user: Account<'info, UserState>,
    #[account(mut)]
    pub blog: Account<'info, BlogState>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[account]
pub struct BlogState {
    pub last_post_id: Pubkey,
    pub authority: Pubkey,
}

#[account]
pub struct PostState {
    pub title: String,
    pub user: Pubkey,
    pub pre_post_id: Pubkey,
    pub authority: Pubkey,
}

#[derive(Accounts)]
pub struct SigUpUser<'info> {
    #[account(init, payer = authority, space = 8 + 32 + 200)]
    pub user: Account<'info, UserState>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>
}


#[account]
pub struct UserState {
    pub name: String,
    pub authority: Pubkey,
}