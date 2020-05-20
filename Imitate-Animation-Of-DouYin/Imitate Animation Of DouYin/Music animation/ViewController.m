//
//  ViewController.m
//  Imitate Animation Of DouYin
//
//  Created by EdwardCheng on 2018/10/24.
//  Copyright © 2018年 EdwardCheng. All rights reserved.
//

#import "ViewController.h"
#import "EdwPlayerProgressView.h"
#import "EdwVideoLanternView.h"
#import "EdwVideoMusicView.h"
#import "EdwVideoSoundSlider.h"
#import <MediaPlayer/MediaPlayer.h>

@interface ViewController ()<EdwVideoSoundSliderDelegate>
@property (strong, nonatomic) EdwPlayerProgressView *progressView;
@property (nonatomic, assign) CGFloat progress;
@property (nonatomic, strong) EdwVideoSoundSlider *slider;

@property (strong, nonatomic) EdwVideoLanternView *lanternView;
@property (strong, nonatomic) EdwVideoMusicView *musicView;
@property (weak, nonatomic) IBOutlet UITextField *musicTextField;
@property (nonatomic, strong) NSTimer *timer;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor blackColor];
    
    _progressView = [[EdwPlayerProgressView alloc]init];
    _progressView.backgroundColor = [UIColor darkGrayColor];
    [self.view addSubview:_progressView];
    [_progressView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.mas_equalTo(self.view).mas_offset(10);
        make.right.mas_equalTo(self.view).mas_offset(-10);
        make.top.mas_equalTo(self.view).mas_offset(70);
        make.height.mas_equalTo(2);
    }];
    
    _slider = [[EdwVideoSoundSlider alloc]init];
    _slider.delegate = self;
    [self.view addSubview:_slider];
    [_slider mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.left.bottom.right.mas_equalTo(self.progressView);
    }];
    
    _lanternView = [[EdwVideoLanternView alloc]init];
    [self.view addSubview:_lanternView];
    [_lanternView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.left.mas_equalTo(self.view).mas_offset(10);
        make.width.mas_equalTo(200);
        make.top.mas_equalTo(150);
        make.height.mas_equalTo(20);
    }];
    
    _musicView = [[EdwVideoMusicView alloc]init];
    [self.view addSubview:_musicView];
    [_musicView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.center.mas_equalTo(self.view);
        make.size.mas_equalTo(CGSizeMake(100, 100));
    }];

    [self systemSound];
    
    NSString *text = @"忘情水 - 刘德华";
    self.lanternView.text = text;
}

//监听系统声音
- (void)systemSound{
    //添加这个将不会出现系统声音的UI(播放音乐时才有效，目前没有添加音乐)
    MPVolumeView *volumeView = [[MPVolumeView alloc] initWithFrame:CGRectMake(-1000, -2000, 0.01, 0.01)];
    [self.view addSubview:volumeView];
    //监听系统声音
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(volumeChanged:) name:@"AVSystemController_SystemVolumeDidChangeNotification" object:nil];
}

//系统声音改变
-(void)volumeChanged:(NSNotification *)notification
{
    float volume = [[[notification userInfo] objectForKey:@"AVSystemController_AudioVolumeNotificationParameter"] floatValue];
    [_slider setValue:volume animate:YES];
    NSLog(@"系统声音= %f",volume);
}

- (void)viewDidDisappear:(BOOL)animated{
    [super viewDidDisappear:animated];
    if (_timer) {
        [_timer invalidate];
        _timer = nil;
    }
}
//播放
- (IBAction)play:(UIButton *)sender {
    [self startTimer];
}

- (void)startTimer{
    if(_timer)return;
    
    self.progress += 0.1;
    
    if (self.progress >= 1.0) {
        self.progress = 0;
    }
    self.progressView.playingProgress = self.progress;
    
    _timer = [NSTimer scheduledTimerWithTimeInterval:1.0 repeats:YES
                                               block:^(NSTimer * _Nonnull timer) {
                                                   self.progress += 0.1;
                                                   
                                                   if (self.progress >= 1.0) {
                                                       self.progress = 0;
                                                   }
                                                   self.progressView.playingProgress = self.progress;
                                               }];
}

//缓存中
- (IBAction)burffer:(UIButton *)sender {
    if (_timer) {
        [_timer invalidate];
        _timer = nil;
    }
    [self.progressView startBurfferAnimate];
}

//更换音乐
- (IBAction)changeMusicName:(UIButton *)sender {
    _lanternView.text = self.musicTextField.text;
}

//开始
- (IBAction)didClickStart:(UIButton *)sender {
    [_lanternView startOrResumeAnimate];
    [_musicView startOrResumeAnimate];
}

//暂停
- (IBAction)didClickPause:(UIButton *)sender {
    [_lanternView pauseAnimate];
    [_musicView pauseAnimate];
}

//继续
- (IBAction)didClickResume:(UIButton *)sender {
    [_lanternView resumeAnimate];
    [_musicView resumeAnimate];
}

//停止
- (IBAction)didClickStop:(UIButton *)sender {
    [_lanternView stopAnimate];
    [_musicView stopAnimate];
}

#pragma mark -- FolVideoSoundSliderDelegate
- (void)edw_VideoSoundSlider:(EdwVideoSoundSlider *)slider isShow:(BOOL)show{
     self.progressView.hidden = show;
}

-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event{
    [self.musicTextField resignFirstResponder];
}
-(void)dealloc{
    NSLog(@"释放 - %@",[self class]);
}
@end
